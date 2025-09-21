using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

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
        private readonly ICosmosDbConfigurationService _configService;

        public GalleryStatsRepository(Container container, ILogger<GalleryStatsRepository> logger, ICosmosDbConfigurationService configService) 
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<GalleryStats?> GetGalleryStatsAsync()
        {
            try
            {
                var config = _configService.GetGalleryStatsDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new GalleryStats
                {
                    Id = doc.id ?? config.DocumentId,
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
                var docConfig = _configService.GetGalleryStatsDocumentConfig();
                config.Id = docConfig.DocumentId;

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

                await CreateOrUpdateAsync(document, docConfig.DocumentId, docConfig.PartitionKey);
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
            var config = _configService.GetGalleryStatsDocumentConfig();
            return await DeleteAsync(config.DocumentId, config.PartitionKey);
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
