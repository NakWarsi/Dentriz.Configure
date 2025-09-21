using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryHeroController : ControllerBase
    {
        private readonly IGalleryHeroService _galleryHeroService;
        private readonly ILogger<GalleryHeroController> _logger;

        public GalleryHeroController(IGalleryHeroService galleryHeroService, ILogger<GalleryHeroController> logger)
        {
            _galleryHeroService = galleryHeroService;
            _logger = logger;
        }

        /// <summary>
        /// Get gallery hero configuration
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetGalleryHero()
        {
            try
            {
                var config = await _galleryHeroService.GetGalleryHeroAsync();
                if (config == null)
                {
                    // Create default configuration if it doesn't exist
                    _logger.LogInformation("Gallery hero configuration not found, creating default configuration");
                    config = await _galleryHeroService.CreateOrUpdateGalleryHeroAsync(new Models.GalleryHero());
                }
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving gallery hero configuration");
                return StatusCode(500, new { message = "Internal server error while retrieving gallery hero configuration" });
            }
        }

        /// <summary>
        /// Create or update gallery hero configuration
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateGalleryHero([FromBody] GalleryHero config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "Gallery hero configuration is required" });
                }

                var savedConfig = await _galleryHeroService.CreateOrUpdateGalleryHeroAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving gallery hero configuration");
                return StatusCode(500, new { message = "Internal server error while saving gallery hero configuration" });
            }
        }

        /// <summary>
        /// Update gallery hero configuration
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> UpdateGalleryHero([FromBody] GalleryHero config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "Gallery hero configuration is required" });
                }

                // Check if configuration exists
                var existingConfig = await _galleryHeroService.GetGalleryHeroAsync();
                if (existingConfig == null)
                {
                    return NotFound(new { message = "Gallery hero configuration not found" });
                }

                var savedConfig = await _galleryHeroService.CreateOrUpdateGalleryHeroAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating gallery hero configuration");
                return StatusCode(500, new { message = "Internal server error while updating gallery hero configuration" });
            }
        }

        /// <summary>
        /// Delete gallery hero configuration
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteGalleryHero()
        {
            try
            {
                var result = await _galleryHeroService.DeleteGalleryHeroAsync();
                if (result)
                {
                    return Ok(new { message = "Gallery hero configuration deleted successfully" });
                }
                return NotFound(new { message = "Gallery hero configuration not found" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting gallery hero configuration");
                return StatusCode(500, new { message = "Internal server error while deleting gallery hero configuration" });
            }
        }
    }
}

