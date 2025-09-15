using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IGalleryStatsRepository
    {
        Task<GalleryStats?> GetGalleryStatsAsync();
        Task<GalleryStats> CreateOrUpdateGalleryStatsAsync(GalleryStats config);
        Task<bool> DeleteGalleryStatsAsync();
    }

    public class GalleryStatsRepository : BaseRepository<dynamic>, IGalleryStatsRepository
    {
        private const string DOCUMENT_ID = "gallery-stats";
        private const string PARTITION_KEY = "gallery-stats";

        public GalleryStatsRepository(Container container, ILogger<GalleryStatsRepository> logger) 
            : base(container, logger)
        {
        }

        public async Task<GalleryStats?> GetGalleryStatsAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new GalleryStats
                {
                    Id = doc.id ?? DOCUMENT_ID,
                    GalleryStatsList = ParseStatItems(doc.galleryStats),
                    StatNumberColor = doc.statNumberColor ?? "#1e3c72",
                    StatLabelColor = doc.statLabelColor ?? "#666666",
                    BackgroundColor = doc.backgroundColor ?? "#f8f9fa",
                    StatNumberFontFamily = doc.statNumberFontFamily ?? "Arial, sans-serif",
                    StatLabelFontFamily = doc.statLabelFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving gallery stats from repository");
                throw;
            }
        }

        public async Task<GalleryStats> CreateOrUpdateGalleryStatsAsync(GalleryStats config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                config.Id = DOCUMENT_ID;

                var document = new
                {
                    id = config.Id,
                    galleryStats = config.GalleryStatsList,
                    statNumberColor = config.StatNumberColor,
                    statLabelColor = config.StatLabelColor,
                    backgroundColor = config.BackgroundColor,
                    statNumberFontFamily = config.StatNumberFontFamily,
                    statLabelFontFamily = config.StatLabelFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving gallery stats to repository");
                throw;
            }
        }

        public async Task<bool> DeleteGalleryStatsAsync()
        {
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }

        private List<StatItem> ParseStatItems(dynamic statItems)
        {
            try
            {
                if (statItems == null)
                {
                    return GetDefaultStatItems();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(statItems);
                var items = System.Text.Json.JsonSerializer.Deserialize<List<StatItem>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return items ?? GetDefaultStatItems();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing stat items from Cosmos DB");
                return GetDefaultStatItems();
            }
        }

        private List<StatItem> GetDefaultStatItems()
        {
            return new List<StatItem>
            {
                new StatItem { Number = "500+", Label = "Cosmetic Dentistry Cases in Wakad" },
                new StatItem { Number = "1000+", Label = "Dental Implants in Pune" },
                new StatItem { Number = "15+", Label = "Years of Dental Care in Wakad" },
                new StatItem { Number = "98%", Label = "Satisfaction at Best Dental Clinic in Wakad" }
            };
        }
    }
}
