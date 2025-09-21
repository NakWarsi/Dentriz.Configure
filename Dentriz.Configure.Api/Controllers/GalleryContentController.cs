using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryContentController : ControllerBase
    {
        private readonly IGalleryContentService _galleryContentService;
        private readonly ILogger<GalleryContentController> _logger;

        public GalleryContentController(IGalleryContentService galleryContentService, ILogger<GalleryContentController> logger)
        {
            _galleryContentService = galleryContentService;
            _logger = logger;
        }

        /// <summary>
        /// Get gallery content configuration
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetGalleryContent()
        {
            try
            {
                var config = await _galleryContentService.GetGalleryContentAsync();
                if (config == null)
                {
                    // Create default configuration if it doesn't exist
                    _logger.LogInformation("Gallery content configuration not found, creating default configuration");
                    config = await _galleryContentService.CreateOrUpdateGalleryContentAsync(new Models.GalleryContent());
                }
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving gallery content configuration");
                return StatusCode(500, new { message = "Internal server error while retrieving gallery content configuration" });
            }
        }

        /// <summary>
        /// Create or update gallery content configuration
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateGalleryContent([FromBody] GalleryContent config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "Gallery content configuration is required" });
                }

                var savedConfig = await _galleryContentService.CreateOrUpdateGalleryContentAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving gallery content configuration");
                return StatusCode(500, new { message = "Internal server error while saving gallery content configuration" });
            }
        }

        /// <summary>
        /// Update gallery content configuration
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> UpdateGalleryContent([FromBody] GalleryContent config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "Gallery content configuration is required" });
                }

                // Check if configuration exists
                var existingConfig = await _galleryContentService.GetGalleryContentAsync();
                if (existingConfig == null)
                {
                    return NotFound(new { message = "Gallery content configuration not found" });
                }

                var savedConfig = await _galleryContentService.CreateOrUpdateGalleryContentAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating gallery content configuration");
                return StatusCode(500, new { message = "Internal server error while updating gallery content configuration" });
            }
        }

        /// <summary>
        /// Delete gallery content configuration
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteGalleryContent()
        {
            try
            {
                var result = await _galleryContentService.DeleteGalleryContentAsync();
                if (result)
                {
                    return Ok(new { message = "Gallery content configuration deleted successfully" });
                }
                return NotFound(new { message = "Gallery content configuration not found" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting gallery content configuration");
                return StatusCode(500, new { message = "Internal server error while deleting gallery content configuration" });
            }
        }
    }
}

