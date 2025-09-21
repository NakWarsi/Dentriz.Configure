using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

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
        private const string DOCUMENT_ID = "gallery-hero";
        private const string PARTITION_KEY = "gallery-hero";

        public GalleryHeroRepository(Container container, ILogger<GalleryHeroRepository> logger) 
            : base(container, logger)
        {
        }

        public async Task<GalleryHero?> GetGalleryHeroAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new GalleryHero
                {
                    Id = doc.id ?? DOCUMENT_ID,
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
                config.Id = DOCUMENT_ID;

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

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
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
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }
    }
}
