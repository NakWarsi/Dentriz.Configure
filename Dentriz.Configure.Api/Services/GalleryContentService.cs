using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IGalleryContentService
    {
        Task<GalleryContent?> GetGalleryContentAsync();
        Task<GalleryContent> CreateOrUpdateGalleryContentAsync(GalleryContent config);
        Task<bool> DeleteGalleryContentAsync();
    }

    public class GalleryContentService : IGalleryContentService
    {
        private readonly IGalleryContentRepository _galleryContentRepository;
        private readonly ILogger<GalleryContentService> _logger;

        public GalleryContentService(IGalleryContentRepository galleryContentRepository, ILogger<GalleryContentService> logger)
        {
            _galleryContentRepository = galleryContentRepository;
            _logger = logger;
        }

        public async Task<GalleryContent?> GetGalleryContentAsync()
        {
            try
            {
                _logger.LogInformation("Getting gallery content configuration");
                return await _galleryContentRepository.GetGalleryContentAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GalleryContentService.GetGalleryContentAsync");
                throw;
            }
        }

        public async Task<GalleryContent> CreateOrUpdateGalleryContentAsync(GalleryContent config)
        {
            try
            {
                _logger.LogInformation("Creating or updating gallery content configuration");
                return await _galleryContentRepository.CreateOrUpdateGalleryContentAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GalleryContentService.CreateOrUpdateGalleryContentAsync");
                throw;
            }
        }

        public async Task<bool> DeleteGalleryContentAsync()
        {
            try
            {
                _logger.LogInformation("Deleting gallery content configuration");
                return await _galleryContentRepository.DeleteGalleryContentAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GalleryContentService.DeleteGalleryContentAsync");
                throw;
            }
        }
    }
}
