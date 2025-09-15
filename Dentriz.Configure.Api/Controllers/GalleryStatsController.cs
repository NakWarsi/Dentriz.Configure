using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryStatsController : ControllerBase
    {
        private readonly IGalleryStatsService _galleryStatsService;
        private readonly ILogger<GalleryStatsController> _logger;

        public GalleryStatsController(IGalleryStatsService galleryStatsService, ILogger<GalleryStatsController> logger)
        {
            _galleryStatsService = galleryStatsService;
            _logger = logger;
        }

        /// <summary>
        /// Get gallery stats configuration
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetGalleryStats()
        {
            try
            {
                var config = await _galleryStatsService.GetGalleryStatsAsync();
                if (config == null)
                {
                    // Create default configuration if it doesn't exist
                    _logger.LogInformation("Gallery stats configuration not found, creating default configuration");
                    config = await _galleryStatsService.CreateOrUpdateGalleryStatsAsync(new Models.GalleryStats());
                }
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving gallery stats configuration");
                return StatusCode(500, new { message = "Internal server error while retrieving gallery stats configuration" });
            }
        }

        /// <summary>
        /// Create or update gallery stats configuration
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateGalleryStats([FromBody] GalleryStats config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "Gallery stats configuration is required" });
                }

                var savedConfig = await _galleryStatsService.CreateOrUpdateGalleryStatsAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving gallery stats configuration");
                return StatusCode(500, new { message = "Internal server error while saving gallery stats configuration" });
            }
        }

        /// <summary>
        /// Update gallery stats configuration
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> UpdateGalleryStats([FromBody] GalleryStats config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest(new { message = "Gallery stats configuration is required" });
                }

                // Check if configuration exists
                var existingConfig = await _galleryStatsService.GetGalleryStatsAsync();
                if (existingConfig == null)
                {
                    return NotFound(new { message = "Gallery stats configuration not found" });
                }

                var savedConfig = await _galleryStatsService.CreateOrUpdateGalleryStatsAsync(config);
                return Ok(savedConfig);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating gallery stats configuration");
                return StatusCode(500, new { message = "Internal server error while updating gallery stats configuration" });
            }
        }

        /// <summary>
        /// Delete gallery stats configuration
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteGalleryStats()
        {
            try
            {
                var result = await _galleryStatsService.DeleteGalleryStatsAsync();
                if (result)
                {
                    return Ok(new { message = "Gallery stats configuration deleted successfully" });
                }
                return NotFound(new { message = "Gallery stats configuration not found" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting gallery stats configuration");
                return StatusCode(500, new { message = "Internal server error while deleting gallery stats configuration" });
            }
        }
    }
}

