using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IGalleryHeroRepository
    {
        Task<GalleryHero?> GetGalleryHeroAsync();
        Task<GalleryHero> CreateOrUpdateGalleryHeroAsync(GalleryHero config);
        Task<bool> DeleteGalleryHeroAsync();
    }

    public class GalleryHeroRepository : BaseRepository<dynamic>, IGalleryHeroRepository
    {
        private readonly ICosmosDbConfigurationService _configService;

        public GalleryHeroRepository(Container container, ILogger<GalleryHeroRepository> logger, ICosmosDbConfigurationService configService) 
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<GalleryHero?> GetGalleryHeroAsync()
        {
            try
            {
                var config = _configService.GetGalleryHeroDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new GalleryHero
                {
                    Id = doc.id ?? config.DocumentId,
                    GalleryTitle = doc.galleryTitle ?? "Dentriz Dental Clinic - Smile Gallery",
                    GallerySubtitle = doc.gallerySubtitle ?? "Cosmetic dentistry in Wakad and dental implants in Pune.",
                    GalleryTitleColor = doc.galleryTitleColor ?? "#1e3c72",
                    GallerySubtitleColor = doc.gallerySubtitleColor ?? "#666666",
                    BackgroundColor = doc.backgroundColor ?? "rgb(231, 241, 235)",
                    GalleryTitleFontFamily = doc.galleryTitleFontFamily ?? "Arial, sans-serif",
                    GallerySubtitleFontFamily = doc.gallerySubtitleFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving gallery hero from repository");
                throw;
            }
        }

        public async Task<GalleryHero> CreateOrUpdateGalleryHeroAsync(GalleryHero config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                var docConfig = _configService.GetGalleryHeroDocumentConfig();
                config.Id = docConfig.DocumentId;

                var document = new
                {
                    id = config.Id,
                    galleryTitle = config.GalleryTitle,
                    gallerySubtitle = config.GallerySubtitle,
                    galleryTitleColor = config.GalleryTitleColor,
                    gallerySubtitleColor = config.GallerySubtitleColor,
                    backgroundColor = config.BackgroundColor,
                    galleryTitleFontFamily = config.GalleryTitleFontFamily,
                    gallerySubtitleFontFamily = config.GallerySubtitleFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, docConfig.DocumentId, docConfig.PartitionKey);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving gallery hero to repository");
                throw;
            }
        }

        public async Task<bool> DeleteGalleryHeroAsync()
        {
            var config = _configService.GetGalleryHeroDocumentConfig();
            return await DeleteAsync(config.DocumentId, config.PartitionKey);
        }
    }
}
