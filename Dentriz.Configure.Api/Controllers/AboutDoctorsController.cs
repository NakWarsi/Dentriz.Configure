using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutDoctorsController : ControllerBase
    {
        private readonly IAboutDoctorsService _aboutDoctorsService;
        private readonly ILogger<AboutDoctorsController> _logger;

        public AboutDoctorsController(IAboutDoctorsService aboutDoctorsService, ILogger<AboutDoctorsController> logger)
        {
            _aboutDoctorsService = aboutDoctorsService;
            _logger = logger;
        }

        /// <summary>
        /// Get about doctors configuration
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAboutDoctors()
        {
            try
            {
                var config = await _aboutDoctorsService.GetAboutDoctorsAsync();
                if (config == null)
                {
                    // Create default configuration if it doesn't exist
                    _logger.LogInformation("About doctors configuration not found, creating default configuration");
                    config = await _aboutDoctorsService.CreateOrUpdateAboutDoctorsAsync(new Models.AboutDoctors());
                }
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving about doctors configuration");
                return StatusCode(500, new { message = "Internal server error while retrieving about doctors configuration" });
            }
        }

        /// <summary>
        /// Create or update about doctors configuration
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateAboutDoctors([FromBody] AboutDoctors config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "About doctors configuration is required" });
                }

                var savedConfig = await _aboutDoctorsService.CreateOrUpdateAboutDoctorsAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving about doctors configuration");
                return StatusCode(500, new { message = "Internal server error while saving about doctors configuration" });
            }
        }

        /// <summary>
        /// Update about doctors configuration
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> UpdateAboutDoctors([FromBody] AboutDoctors config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "About doctors configuration is required" });
                }

                // Check if configuration exists
                var existingConfig = await _aboutDoctorsService.GetAboutDoctorsAsync();
                if (existingConfig == null)
                {
                    return NotFound(new { message = "About doctors configuration not found" });
                }

                var savedConfig = await _aboutDoctorsService.CreateOrUpdateAboutDoctorsAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating about doctors configuration");
                return StatusCode(500, new { message = "Internal server error while updating about doctors configuration" });
            }
        }

        /// <summary>
        /// Delete about doctors configuration
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteAboutDoctors()
        {
            try
            {
                var result = await _aboutDoctorsService.DeleteAboutDoctorsAsync();
                if (result)
                {
                    return Ok(new { message = "About doctors configuration deleted successfully" });
                }
                return NotFound(new { message = "About doctors configuration not found" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting about doctors configuration");
                return StatusCode(500, new { message = "Internal server error while deleting about doctors configuration" });
            }
        }
    }
}
