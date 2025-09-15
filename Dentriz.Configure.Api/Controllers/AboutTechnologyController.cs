using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutTechnologyController : ControllerBase
    {
        private readonly IAboutTechnologyService _aboutTechnologyService;
        private readonly ILogger<AboutTechnologyController> _logger;

        public AboutTechnologyController(IAboutTechnologyService aboutTechnologyService, ILogger<AboutTechnologyController> logger)
        {
            _aboutTechnologyService = aboutTechnologyService;
            _logger = logger;
        }

        /// <summary>
        /// Get about technology configuration
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAboutTechnology()
        {
            try
            {
                var config = await _aboutTechnologyService.GetAboutTechnologyAsync();
                if (config == null)
                {
                    // Create default configuration if it doesn't exist
                    _logger.LogInformation("About technology configuration not found, creating default configuration");
                    config = await _aboutTechnologyService.CreateOrUpdateAboutTechnologyAsync(new Models.AboutTechnology());
                }
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving about technology configuration");
                return StatusCode(500, new { message = "Internal server error while retrieving about technology configuration" });
            }
        }

        /// <summary>
        /// Create or update about technology configuration
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateAboutTechnology([FromBody] AboutTechnology config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "About technology configuration is required" });
                }

                var savedConfig = await _aboutTechnologyService.CreateOrUpdateAboutTechnologyAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving about technology configuration");
                return StatusCode(500, new { message = "Internal server error while saving about technology configuration" });
            }
        }

        /// <summary>
        /// Update about technology configuration
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> UpdateAboutTechnology([FromBody] AboutTechnology config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "About technology configuration is required" });
                }

                // Check if configuration exists
                var existingConfig = await _aboutTechnologyService.GetAboutTechnologyAsync();
                if (existingConfig == null)
                {
                    return NotFound(new { message = "About technology configuration not found" });
                }

                var savedConfig = await _aboutTechnologyService.CreateOrUpdateAboutTechnologyAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating about technology configuration");
                return StatusCode(500, new { message = "Internal server error while updating about technology configuration" });
            }
        }

        /// <summary>
        /// Delete about technology configuration
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteAboutTechnology()
        {
            try
            {
                var result = await _aboutTechnologyService.DeleteAboutTechnologyAsync();
                if (result)
                {
                    return Ok(new { message = "About technology configuration deleted successfully" });
                }
                return NotFound(new { message = "About technology configuration not found" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting about technology configuration");
                return StatusCode(500, new { message = "Internal server error while deleting about technology configuration" });
            }
        }
    }
}
