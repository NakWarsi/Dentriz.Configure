using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutValuesController : ControllerBase
    {
        private readonly IAboutValuesService _aboutValuesService;
        private readonly ILogger<AboutValuesController> _logger;

        public AboutValuesController(IAboutValuesService aboutValuesService, ILogger<AboutValuesController> logger)
        {
            _aboutValuesService = aboutValuesService;
            _logger = logger;
        }

        /// <summary>
        /// Get about values configuration
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAboutValues()
        {
            try
            {
                var config = await _aboutValuesService.GetAboutValuesAsync();
                if (config == null)
                {
                    // Create default configuration if it doesn't exist
                    _logger.LogInformation("About values configuration not found, creating default configuration");
                    config = await _aboutValuesService.CreateOrUpdateAboutValuesAsync(new Models.AboutValues());
                }
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving about values configuration");
                return StatusCode(500, new { message = "Internal server error while retrieving about values configuration" });
            }
        }

        /// <summary>
        /// Create or update about values configuration
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateAboutValues([FromBody] AboutValues config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "About values configuration is required" });
                }

                var savedConfig = await _aboutValuesService.CreateOrUpdateAboutValuesAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving about values configuration");
                return StatusCode(500, new { message = "Internal server error while saving about values configuration" });
            }
        }

        /// <summary>
        /// Update about values configuration
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> UpdateAboutValues([FromBody] AboutValues config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "About values configuration is required" });
                }

                // Check if configuration exists
                var existingConfig = await _aboutValuesService.GetAboutValuesAsync();
                if (existingConfig == null)
                {
                    return NotFound(new { message = "About values configuration not found" });
                }

                var savedConfig = await _aboutValuesService.CreateOrUpdateAboutValuesAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating about values configuration");
                return StatusCode(500, new { message = "Internal server error while updating about values configuration" });
            }
        }

        /// <summary>
        /// Delete about values configuration
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteAboutValues()
        {
            try
            {
                var result = await _aboutValuesService.DeleteAboutValuesAsync();
                if (result)
                {
                    return Ok(new { message = "About values configuration deleted successfully" });
                }
                return NotFound(new { message = "About values configuration not found" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting about values configuration");
                return StatusCode(500, new { message = "Internal server error while deleting about values configuration" });
            }
        }
    }
}
