using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IGalleryContentRepository
    {
        Task<GalleryContent?> GetGalleryContentAsync();
        Task<GalleryContent> CreateOrUpdateGalleryContentAsync(GalleryContent config);
        Task<bool> DeleteGalleryContentAsync();
    }

    public class GalleryContentRepository : BaseRepository<dynamic>, IGalleryContentRepository
    {
        private const string DOCUMENT_ID = "gallery-content";
        private const string PARTITION_KEY = "gallery-content";

        public GalleryContentRepository(Container container, ILogger<GalleryContentRepository> logger) 
            : base(container, logger)
        {
        }

        public async Task<GalleryContent?> GetGalleryContentAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new GalleryContent
                {
                    Id = doc.id ?? DOCUMENT_ID,
                    GallerySections = ParseGallerySections(doc.gallerySections),
                    CardTitleColor = doc.cardTitleColor ?? "#1e3c72",
                    CardDescriptionColor = doc.cardDescriptionColor ?? "#666666",
                    PlaceholderTextColor = doc.placeholderTextColor ?? "#ffffff",
                    ImageCountColor = doc.imageCountColor ?? "#ffffff",
                    BackgroundColor = doc.backgroundColor ?? "transparent",
                    CardBackgroundColor = doc.cardBackgroundColor ?? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    CardTitleFontFamily = doc.cardTitleFontFamily ?? "Arial, sans-serif",
                    CardDescriptionFontFamily = doc.cardDescriptionFontFamily ?? "Arial, sans-serif",
                    PlaceholderTextFontFamily = doc.placeholderTextFontFamily ?? "Arial, sans-serif",
                    ImageCountFontFamily = doc.imageCountFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving gallery content from repository");
                throw;
            }
        }

        public async Task<GalleryContent> CreateOrUpdateGalleryContentAsync(GalleryContent config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                config.Id = DOCUMENT_ID;

                var document = new
                {
                    id = config.Id,
                    gallerySections = config.GallerySections,
                    cardTitleColor = config.CardTitleColor,
                    cardDescriptionColor = config.CardDescriptionColor,
                    placeholderTextColor = config.PlaceholderTextColor,
                    imageCountColor = config.ImageCountColor,
                    backgroundColor = config.BackgroundColor,
                    cardBackgroundColor = config.CardBackgroundColor,
                    cardTitleFontFamily = config.CardTitleFontFamily,
                    cardDescriptionFontFamily = config.CardDescriptionFontFamily,
                    placeholderTextFontFamily = config.PlaceholderTextFontFamily,
                    imageCountFontFamily = config.ImageCountFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving gallery content to repository");
                throw;
            }
        }

        public async Task<bool> DeleteGalleryContentAsync()
        {
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }

        private List<GallerySection> ParseGallerySections(dynamic gallerySections)
        {
            try
            {
                if (gallerySections == null)
                {
                    return GetDefaultGallerySections();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(gallerySections);
                var sections = System.Text.Json.JsonSerializer.Deserialize<List<GallerySection>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return sections ?? GetDefaultGallerySections();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing gallery sections from Cosmos DB");
                return GetDefaultGallerySections();
            }
        }

        private List<GallerySection> GetDefaultGallerySections()
        {
            return new List<GallerySection>
            {
                new GallerySection { Id = "before-after", Title = "Before & After", Description = "See the amazing transformations", Route = "/smile-gallery/before-after", Color = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", ImageCount = 25 },
                new GallerySection { Id = "smile-showcase", Title = "Smile Showcase", Description = "Beautiful smiles created", Route = "/smile-gallery/smile-showcase", Color = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", ImageCount = 30 }
            };
        }
    }
}
