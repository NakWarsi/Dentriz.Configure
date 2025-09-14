using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using System.ComponentModel.DataAnnotations;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HeaderController : ControllerBase
    {
        private readonly ICosmosDbService _cosmosDbService;
        private readonly ILogger<HeaderController> _logger;

        public HeaderController(ICosmosDbService cosmosDbService, ILogger<HeaderController> logger)
        {
            _cosmosDbService = cosmosDbService;
            _logger = logger;
        }

        /// <summary>
        /// Get the current header configuration
        /// </summary>
        /// <returns>Header configuration or default if not found</returns>
        [HttpGet]
        public async Task<ActionResult<HeaderConfig>> GetHeaderConfig()
        {
            try
            {
                var config = await _cosmosDbService.GetHeaderConfigAsync();
                
                if (config == null)
                {
                    _logger.LogInformation("No header config found in Cosmos DB");
                    return NotFound(new { message = "Header configuration not found in database" });
                }

                _logger.LogInformation("Header config retrieved successfully from Cosmos DB");
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving header configuration from Cosmos DB");
                return StatusCode(500, new { message = "Internal server error while retrieving header configuration" });
            }
        }

        /// <summary>
        /// Create or update the header configuration
        /// </summary>
        /// <param name="request">Header configuration data</param>
        /// <returns>Updated header configuration</returns>
        [HttpPost]
        public async Task<ActionResult<HeaderConfig>> CreateOrUpdateHeaderConfig([FromBody] HeaderConfigRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Get existing configuration from Cosmos DB or create new one
                var existingConfig = await _cosmosDbService.GetHeaderConfigAsync();
                if (existingConfig == null)
                {
                    _logger.LogInformation("No existing header config found, creating new configuration");
                    existingConfig = new HeaderConfig();
                }
                else
                {
                    _logger.LogInformation("Found existing header config in Cosmos DB, updating it");
                }

                // Update only the provided fields
                var updatedConfig = UpdateHeaderConfig(existingConfig, request);

                // Save to Cosmos DB
                var savedConfig = await _cosmosDbService.CreateOrUpdateHeaderConfigAsync(updatedConfig);

                _logger.LogInformation("Header configuration successfully saved to Cosmos DB");
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving header configuration to Cosmos DB");
                return StatusCode(500, new { message = "Internal server error while saving header configuration" });
            }
        }

        /// <summary>
        /// Update specific header configuration fields
        /// </summary>
        /// <param name="request">Header configuration data to update</param>
        /// <returns>Updated header configuration</returns>
        [HttpPut]
        public async Task<ActionResult<HeaderConfig>> UpdateHeaderConfig([FromBody] HeaderConfigRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Get existing configuration from Cosmos DB
                var existingConfig = await _cosmosDbService.GetHeaderConfigAsync();
                if (existingConfig == null)
                {
                    _logger.LogWarning("Header configuration not found in Cosmos DB for update");
                    return NotFound(new { message = "Header configuration not found in database. Use POST to create a new configuration." });
                }

                // Update only the provided fields
                var updatedConfig = UpdateHeaderConfig(existingConfig, request);

                // Save to Cosmos DB
                var savedConfig = await _cosmosDbService.CreateOrUpdateHeaderConfigAsync(updatedConfig);

                _logger.LogInformation("Header configuration successfully updated in Cosmos DB");
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating header configuration in Cosmos DB");
                return StatusCode(500, new { message = "Internal server error while updating header configuration" });
            }
        }

        /// <summary>
        /// Delete the header configuration
        /// </summary>
        /// <returns>Success status</returns>
        [HttpDelete]
        public async Task<ActionResult> DeleteHeaderConfig()
        {
            try
            {
                var deleted = await _cosmosDbService.DeleteHeaderConfigAsync();
                
                if (deleted)
                {
                    _logger.LogInformation("Header configuration successfully deleted");
                    return Ok(new { message = "Header configuration deleted successfully" });
                }
                else
                {
                    return NotFound(new { message = "Header configuration not found" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting header configuration");
                return StatusCode(500, new { message = "Internal server error while deleting header configuration" });
            }
        }

        /// <summary>
        /// Reset header configuration to default values
        /// </summary>
        /// <returns>Default header configuration</returns>
        [HttpPost("reset")]
        public async Task<ActionResult<HeaderConfig>> ResetHeaderConfig()
        {
            try
            {
                var defaultConfig = new HeaderConfig();
                var savedConfig = await _cosmosDbService.CreateOrUpdateHeaderConfigAsync(defaultConfig);

                _logger.LogInformation("Header configuration reset to default values");
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resetting header configuration");
                return StatusCode(500, new { message = "Internal server error while resetting header configuration" });
            }
        }

        /// <summary>
        /// Update navigation items
        /// </summary>
        /// <param name="navItems">Navigation items to update</param>
        /// <returns>Updated header configuration</returns>
        [HttpPut("nav-items")]
        public async Task<ActionResult<HeaderConfig>> UpdateNavItems([FromBody] List<NavItem> navItems)
        {
            try
            {
                if (navItems == null || !navItems.Any())
                {
                    return BadRequest(new { message = "Navigation items cannot be empty" });
                }

                // Get existing configuration
                var existingConfig = await _cosmosDbService.GetHeaderConfigAsync() ?? new HeaderConfig();
                
                // Update navigation items
                existingConfig.NavItems = navItems;

                // Save to Cosmos DB
                var savedConfig = await _cosmosDbService.CreateOrUpdateHeaderConfigAsync(existingConfig);

                _logger.LogInformation("Navigation items successfully updated");
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating navigation items");
                return StatusCode(500, new { message = "Internal server error while updating navigation items" });
            }
        }

        private HeaderConfig UpdateHeaderConfig(HeaderConfig existing, HeaderConfigRequest request)
        {
            if (request.LogoAlt != null) existing.LogoAlt = request.LogoAlt;
            if (request.LogoImage != null) existing.LogoImage = request.LogoImage;
            if (request.ClinicName != null) existing.ClinicName = request.ClinicName;
            if (request.Tagline != null) existing.Tagline = request.Tagline;
            if (request.NavItems != null) existing.NavItems = request.NavItems;
            if (request.BackgroundColor != null) existing.BackgroundColor = request.BackgroundColor;
            if (request.TextColor != null) existing.TextColor = request.TextColor;
            if (request.LogoTextColor != null) existing.LogoTextColor = request.LogoTextColor;
            if (request.TaglineColor != null) existing.TaglineColor = request.TaglineColor;
            if (request.NavLinkColor != null) existing.NavLinkColor = request.NavLinkColor;
            if (request.NavLinkHoverColor != null) existing.NavLinkHoverColor = request.NavLinkHoverColor;
            if (request.NavLinkActiveColor != null) existing.NavLinkActiveColor = request.NavLinkActiveColor;
            if (request.MobileMenuBgColor != null) existing.MobileMenuBgColor = request.MobileMenuBgColor;
            if (request.MobileMenuTextColor != null) existing.MobileMenuTextColor = request.MobileMenuTextColor;
            if (request.ClinicNameFontFamily != null) existing.ClinicNameFontFamily = request.ClinicNameFontFamily;
            if (request.TaglineFontFamily != null) existing.TaglineFontFamily = request.TaglineFontFamily;
            if (request.NavLinkFontFamily != null) existing.NavLinkFontFamily = request.NavLinkFontFamily;

            return existing;
        }
    }
}
