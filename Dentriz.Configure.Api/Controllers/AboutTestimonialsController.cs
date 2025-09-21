using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutTestimonialsController : ControllerBase
    {
        private readonly IAboutTestimonialsService _aboutTestimonialsService;
        private readonly ILogger<AboutTestimonialsController> _logger;

        public AboutTestimonialsController(IAboutTestimonialsService aboutTestimonialsService, ILogger<AboutTestimonialsController> logger)
        {
            _aboutTestimonialsService = aboutTestimonialsService;
            _logger = logger;
        }

        /// <summary>
        /// Get about testimonials configuration
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAboutTestimonials()
        {
            try
            {
                var config = await _aboutTestimonialsService.GetAboutTestimonialsAsync();
                if (config == null)
                {
                    // Create default configuration if it doesn't exist
                    _logger.LogInformation("About testimonials configuration not found, creating default configuration");
                    config = await _aboutTestimonialsService.CreateOrUpdateAboutTestimonialsAsync(new Models.AboutTestimonials());
                }
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving about testimonials configuration");
                return StatusCode(500, new { message = "Internal server error while retrieving about testimonials configuration" });
            }
        }

        /// <summary>
        /// Create or update about testimonials configuration
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateAboutTestimonials([FromBody] AboutTestimonials config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "About testimonials configuration is required" });
                }

                var savedConfig = await _aboutTestimonialsService.CreateOrUpdateAboutTestimonialsAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving about testimonials configuration");
                return StatusCode(500, new { message = "Internal server error while saving about testimonials configuration" });
            }
        }

        /// <summary>
        /// Update about testimonials configuration
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> UpdateAboutTestimonials([FromBody] AboutTestimonials config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "About testimonials configuration is required" });
                }

                // Check if configuration exists
                var existingConfig = await _aboutTestimonialsService.GetAboutTestimonialsAsync();
                if (existingConfig == null)
                {
                    return NotFound(new { message = "About testimonials configuration not found" });
                }

                var savedConfig = await _aboutTestimonialsService.CreateOrUpdateAboutTestimonialsAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating about testimonials configuration");
                return StatusCode(500, new { message = "Internal server error while updating about testimonials configuration" });
            }
        }

        /// <summary>
        /// Delete about testimonials configuration
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteAboutTestimonials()
        {
            try
            {
                var result = await _aboutTestimonialsService.DeleteAboutTestimonialsAsync();
                if (result)
                {
                    return Ok(new { message = "About testimonials configuration deleted successfully" });
                }
                return NotFound(new { message = "About testimonials configuration not found" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting about testimonials configuration");
                return StatusCode(500, new { message = "Internal server error while deleting about testimonials configuration" });
            }
        }
    }
}
