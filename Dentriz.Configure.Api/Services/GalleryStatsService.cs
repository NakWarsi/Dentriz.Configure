using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IGalleryStatsService
    {
        Task<GalleryStats?> GetGalleryStatsAsync();
        Task<GalleryStats> CreateOrUpdateGalleryStatsAsync(GalleryStats config);
        Task<bool> DeleteGalleryStatsAsync();
    }

    public class GalleryStatsService : IGalleryStatsService
    {
        private readonly IGalleryStatsRepository _galleryStatsRepository;
        private readonly ILogger<GalleryStatsService> _logger;

        public GalleryStatsService(IGalleryStatsRepository galleryStatsRepository, ILogger<GalleryStatsService> logger)
        {
            _galleryStatsRepository = galleryStatsRepository;
            _logger = logger;
        }

        public async Task<GalleryStats?> GetGalleryStatsAsync()
        {
            try
            {
                _logger.LogInformation("Getting gallery stats configuration");
                return await _galleryStatsRepository.GetGalleryStatsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GalleryStatsService.GetGalleryStatsAsync");
                throw;
            }
        }

        public async Task<GalleryStats> CreateOrUpdateGalleryStatsAsync(GalleryStats config)
        {
            try
            {
                _logger.LogInformation("Creating or updating gallery stats configuration");
                return await _galleryStatsRepository.CreateOrUpdateGalleryStatsAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GalleryStatsService.CreateOrUpdateGalleryStatsAsync");
                throw;
            }
        }

        public async Task<bool> DeleteGalleryStatsAsync()
        {
            try
            {
                _logger.LogInformation("Deleting gallery stats configuration");
                return await _galleryStatsRepository.DeleteGalleryStatsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GalleryStatsService.DeleteGalleryStatsAsync");
                throw;
            }
        }
    }
}
