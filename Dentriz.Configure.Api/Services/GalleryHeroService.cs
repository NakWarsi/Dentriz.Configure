using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IGalleryHeroService
    {
        Task<GalleryHero?> GetGalleryHeroAsync();
        Task<GalleryHero> CreateOrUpdateGalleryHeroAsync(GalleryHero config);
        Task<bool> DeleteGalleryHeroAsync();
    }

    public class GalleryHeroService : IGalleryHeroService
    {
        private readonly IGalleryHeroRepository _galleryHeroRepository;
        private readonly ILogger<GalleryHeroService> _logger;

        public GalleryHeroService(IGalleryHeroRepository galleryHeroRepository, ILogger<GalleryHeroService> logger)
        {
            _galleryHeroRepository = galleryHeroRepository;
            _logger = logger;
        }

        public async Task<GalleryHero?> GetGalleryHeroAsync()
        {
            try
            {
                _logger.LogInformation("Getting gallery hero configuration");
                return await _galleryHeroRepository.GetGalleryHeroAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GalleryHeroService.GetGalleryHeroAsync");
                throw;
            }
        }

        public async Task<GalleryHero> CreateOrUpdateGalleryHeroAsync(GalleryHero config)
        {
            try
            {
                _logger.LogInformation("Creating or updating gallery hero configuration");
                return await _galleryHeroRepository.CreateOrUpdateGalleryHeroAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GalleryHeroService.CreateOrUpdateGalleryHeroAsync");
                throw;
            }
        }

        public async Task<bool> DeleteGalleryHeroAsync()
        {
            try
            {
                _logger.LogInformation("Deleting gallery hero configuration");
                return await _galleryHeroRepository.DeleteGalleryHeroAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GalleryHeroService.DeleteGalleryHeroAsync");
                throw;
            }
        }
    }
}
