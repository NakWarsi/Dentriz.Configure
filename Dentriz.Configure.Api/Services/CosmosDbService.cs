using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;
using System.Text.Json;

namespace Dentriz.Configure.Api.Services
{
    public interface ICosmosDbService
    {
        Task<HeaderConfig?> GetHeaderConfigAsync();
        Task<HeaderConfig> CreateOrUpdateHeaderConfigAsync(HeaderConfig config);
        Task<bool> DeleteHeaderConfigAsync();

        // Gallery Content methods
        Task<GalleryContent?> GetGalleryContentAsync();
        Task<GalleryContent> CreateOrUpdateGalleryContentAsync(GalleryContent config);
        Task<bool> DeleteGalleryContentAsync();

        // Gallery Hero methods
        Task<GalleryHero?> GetGalleryHeroAsync();
        Task<GalleryHero> CreateOrUpdateGalleryHeroAsync(GalleryHero config);
        Task<bool> DeleteGalleryHeroAsync();

        // Gallery Stats methods
        Task<GalleryStats?> GetGalleryStatsAsync();
        Task<GalleryStats> CreateOrUpdateGalleryStatsAsync(GalleryStats config);
        Task<bool> DeleteGalleryStatsAsync();
    }

    public class CosmosDbService : ICosmosDbService
    {
        private readonly CosmosClient _cosmosClient;
        private readonly string _databaseName;
        private readonly ILogger<CosmosDbService> _logger;
        private readonly Dictionary<string, Container> _containers;

        public CosmosDbService(IConfiguration configuration, ILogger<CosmosDbService> logger)
        {
            _logger = logger;
            
            var connectionString = configuration.GetConnectionString("CosmosDB");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("CosmosDB connection string is not configured");
            }

            _cosmosClient = new CosmosClient(connectionString);
            _databaseName = configuration["CosmosDB:DatabaseName"] ?? "Dentriz";
            
            // Initialize containers
            _containers = new Dictionary<string, Container>
            {
                { "Header", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:Header"] ?? "header") },
                { "GalleryContent", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:GalleryContent"] ?? "GalleryContent") },
                { "GalleryHero", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:GalleryHero"] ?? "GalleryHero") },
                { "GalleryStats", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:GalleryStats"] ?? "GalleryStats") }
            };
        }

        private Container GetContainer(string containerType)
        {
            if (!_containers.TryGetValue(containerType, out var container))
            {
                throw new InvalidOperationException($"Container type '{containerType}' is not configured");
            }
            return container;
        }

        // Header Repository Methods
        public async Task<HeaderConfig?> GetHeaderConfigAsync()
        {
            try
            {
                var container = GetContainer("Header");
                var response = await container.ReadItemAsync<dynamic>(
                    id: "header-config",
                    partitionKey: new PartitionKey("header-config")
                );

                var doc = response.Resource;
                
                // Convert dynamic document to HeaderConfig
                var config = new HeaderConfig
                {
                    Id = doc.id ?? "header-config",
                    LogoAlt = doc.logoAlt ?? "DentRiz Dental Clinic Logo",
                    LogoImage = doc.logoImage ?? "/images/clinic/logo.png",
                    ClinicName = doc.clinicName ?? "DentRiz Dental Clinic",
                    Tagline = doc.tagline ?? "Multi Speciality Dental Clinic & Implant Center",
                    NavItems = ParseNavItems(doc.navItems),
                    BackgroundColor = doc.backgroundColor ?? "#ffffff",
                    TextColor = doc.textColor ?? "#1e3c72",
                    LogoTextColor = doc.logoTextColor ?? "#1e3c72",
                    TaglineColor = doc.taglineColor ?? "#666666",
                    NavLinkColor = doc.navLinkColor ?? "#1e3c72",
                    NavLinkHoverColor = doc.navLinkHoverColor ?? "#2c5aa0",
                    NavLinkActiveColor = doc.navLinkActiveColor ?? "#2c5aa0",
                    MobileMenuBgColor = doc.mobileMenuBgColor ?? "#ffffff",
                    MobileMenuTextColor = doc.mobileMenuTextColor ?? "#1e3c72",
                    ClinicNameFontFamily = doc.clinicNameFontFamily ?? "Arial, sans-serif",
                    TaglineFontFamily = doc.taglineFontFamily ?? "Arial, sans-serif",
                    NavLinkFontFamily = doc.navLinkFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };

                return config;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogInformation("Header config not found, returning null");
                return null;
            }
            catch (CosmosException ex)
            {
                _logger.LogError(ex, "Cosmos DB error retrieving header config: {StatusCode} - {Message}", ex.StatusCode, ex.Message);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving header config from Cosmos DB");
                throw;
            }
        }

        public async Task<HeaderConfig> CreateOrUpdateHeaderConfigAsync(HeaderConfig config)
        {
            try
            {
                // Set metadata
                config.LastUpdated = DateTime.UtcNow;
                config.Id = "header-config";

                // Create a simple document structure
                var document = new
                {
                    id = config.Id,
                    logoAlt = config.LogoAlt,
                    logoImage = config.LogoImage,
                    clinicName = config.ClinicName,
                    tagline = config.Tagline,
                    navItems = config.NavItems,
                    backgroundColor = config.BackgroundColor,
                    textColor = config.TextColor,
                    logoTextColor = config.LogoTextColor,
                    taglineColor = config.TaglineColor,
                    navLinkColor = config.NavLinkColor,
                    navLinkHoverColor = config.NavLinkHoverColor,
                    navLinkActiveColor = config.NavLinkActiveColor,
                    mobileMenuBgColor = config.MobileMenuBgColor,
                    mobileMenuTextColor = config.MobileMenuTextColor,
                    clinicNameFontFamily = config.ClinicNameFontFamily,
                    taglineFontFamily = config.TaglineFontFamily,
                    navLinkFontFamily = config.NavLinkFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                var container = GetContainer("Header");
                var response = await container.UpsertItemAsync(
                    item: document,
                    partitionKey: new PartitionKey(config.Id)
                );

                _logger.LogInformation("Header config successfully saved to Cosmos DB");
                
                // Convert back to HeaderConfig
                return config;
            }
            catch (CosmosException ex)
            {
                _logger.LogError(ex, "Cosmos DB error saving header config: {StatusCode} - {Message}", ex.StatusCode, ex.Message);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving header config to Cosmos DB");
                throw;
            }
        }

        public async Task<bool> DeleteHeaderConfigAsync()
        {
            try
            {
                var container = GetContainer("Header");
                await container.DeleteItemAsync<HeaderConfig>(
                    id: "header-config",
                    partitionKey: new PartitionKey("header-config")
                );

                _logger.LogInformation("Header config successfully deleted from Cosmos DB");
                return true;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogInformation("Header config not found for deletion");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting header config from Cosmos DB");
                throw;
            }
        }

        // Gallery Content Repository Methods
        public async Task<GalleryContent?> GetGalleryContentAsync()
        {
            try
            {
                var container = GetContainer("GalleryContent");
                var response = await container.ReadItemAsync<dynamic>(
                    id: "gallery-content",
                    partitionKey: new PartitionKey("gallery-content")
                );

                var doc = response.Resource;
                var config = new GalleryContent
                {
                    Id = doc.id ?? "gallery-content",
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

                return config;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving gallery content from Cosmos DB");
                throw;
            }
        }

        public async Task<GalleryContent> CreateOrUpdateGalleryContentAsync(GalleryContent config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                config.Id = "gallery-content";

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

                var container = GetContainer("GalleryContent");
                await container.UpsertItemAsync(
                    item: document,
                    partitionKey: new PartitionKey(config.Id)
                );

                _logger.LogInformation("Gallery content successfully saved to Cosmos DB");
                return config;
            }
            catch (CosmosException ex)
            {
                _logger.LogError(ex, "Cosmos DB error saving gallery content: {StatusCode} - {Message}", ex.StatusCode, ex.Message);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving gallery content to Cosmos DB");
                throw;
            }
        }

        public async Task<bool> DeleteGalleryContentAsync()
        {
            try
            {
                var container = GetContainer("GalleryContent");
                await container.DeleteItemAsync<dynamic>(
                    id: "gallery-content",
                    partitionKey: new PartitionKey("gallery-content")
                );

                _logger.LogInformation("Gallery content successfully deleted from Cosmos DB");
                return true;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogWarning("Gallery content not found for deletion");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting gallery content from Cosmos DB");
                throw;
            }
        }

        // Gallery Hero Repository Methods
        public async Task<GalleryHero?> GetGalleryHeroAsync()
        {
            try
            {
                var container = GetContainer("GalleryHero");
                var response = await container.ReadItemAsync<dynamic>(
                    id: "gallery-hero",
                    partitionKey: new PartitionKey("gallery-hero")
                );

                var doc = response.Resource;
                var config = new GalleryHero
                {
                    Id = doc.id ?? "gallery-hero",
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

                return config;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving gallery hero from Cosmos DB");
                throw;
            }
        }

        public async Task<GalleryHero> CreateOrUpdateGalleryHeroAsync(GalleryHero config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                config.Id = "gallery-hero";

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

                var container = GetContainer("GalleryHero");
                await container.UpsertItemAsync(
                    item: document,
                    partitionKey: new PartitionKey(config.Id)
                );

                _logger.LogInformation("Gallery hero successfully saved to Cosmos DB");
                return config;
            }
            catch (CosmosException ex)
            {
                _logger.LogError(ex, "Cosmos DB error saving gallery hero: {StatusCode} - {Message}", ex.StatusCode, ex.Message);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving gallery hero to Cosmos DB");
                throw;
            }
        }

        public async Task<bool> DeleteGalleryHeroAsync()
        {
            try
            {
                var container = GetContainer("GalleryHero");
                await container.DeleteItemAsync<dynamic>(
                    id: "gallery-hero",
                    partitionKey: new PartitionKey("gallery-hero")
                );

                _logger.LogInformation("Gallery hero successfully deleted from Cosmos DB");
                return true;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogWarning("Gallery hero not found for deletion");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting gallery hero from Cosmos DB");
                throw;
            }
        }

        // Gallery Stats Repository Methods
        public async Task<GalleryStats?> GetGalleryStatsAsync()
        {
            try
            {
                var container = GetContainer("GalleryStats");
                var response = await container.ReadItemAsync<dynamic>(
                    id: "gallery-stats",
                    partitionKey: new PartitionKey("gallery-stats")
                );

                var doc = response.Resource;
                var config = new GalleryStats
                {
                    Id = doc.id ?? "gallery-stats",
                    GalleryStatsList = ParseStatItems(doc.galleryStats),
                    StatNumberColor = doc.statNumberColor ?? "#1e3c72",
                    StatLabelColor = doc.statLabelColor ?? "#666666",
                    BackgroundColor = doc.backgroundColor ?? "#f8f9fa",
                    StatNumberFontFamily = doc.statNumberFontFamily ?? "Arial, sans-serif",
                    StatLabelFontFamily = doc.statLabelFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };

                return config;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving gallery stats from Cosmos DB");
                throw;
            }
        }

        public async Task<GalleryStats> CreateOrUpdateGalleryStatsAsync(GalleryStats config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                config.Id = "gallery-stats";

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

                var container = GetContainer("GalleryStats");
                await container.UpsertItemAsync(
                    item: document,
                    partitionKey: new PartitionKey(config.Id)
                );

                _logger.LogInformation("Gallery stats successfully saved to Cosmos DB");
                return config;
            }
            catch (CosmosException ex)
            {
                _logger.LogError(ex, "Cosmos DB error saving gallery stats: {StatusCode} - {Message}", ex.StatusCode, ex.Message);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving gallery stats to Cosmos DB");
                throw;
            }
        }

        public async Task<bool> DeleteGalleryStatsAsync()
        {
            try
            {
                var container = GetContainer("GalleryStats");
                await container.DeleteItemAsync<dynamic>(
                    id: "gallery-stats",
                    partitionKey: new PartitionKey("gallery-stats")
                );

                _logger.LogInformation("Gallery stats successfully deleted from Cosmos DB");
                return true;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogWarning("Gallery stats not found for deletion");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting gallery stats from Cosmos DB");
                throw;
            }
        }

        // Helper Methods
        private List<NavItem> ParseNavItems(dynamic navItems)
        {
            try
            {
                if (navItems == null)
                {
                    _logger.LogInformation("NavItems is null in Cosmos DB document");
                    return new List<NavItem>();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(navItems);

                // Try to deserialize as array first
                if (navItems is System.Collections.IEnumerable enumerable)
                {
                    var items = new List<NavItem>();
                    foreach (var item in enumerable)
                    {
                        var itemJson = System.Text.Json.JsonSerializer.Serialize(item);
                        var navItem = System.Text.Json.JsonSerializer.Deserialize<NavItem>(itemJson, new System.Text.Json.JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        });
                        if (navItem != null)
                        {
                            items.Add(navItem);
                        }
                    }
                    _logger.LogInformation("Successfully parsed {Count} navigation items", items.Count);
                    return items;
                }

                // Fallback: try direct deserialization
                var directItems = System.Text.Json.JsonSerializer.Deserialize<List<NavItem>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return directItems ?? new List<NavItem>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing navigation items from Cosmos DB");
                return new List<NavItem>();
            }
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

        private List<GallerySection> GetDefaultGallerySections()
        {
            return new List<GallerySection>
            {
                new GallerySection { Id = "before-after", Title = "Before & After", Description = "See the amazing transformations", Route = "/smile-gallery/before-after", Color = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", ImageCount = 25 },
                new GallerySection { Id = "smile-showcase", Title = "Smile Showcase", Description = "Beautiful smiles created", Route = "/smile-gallery/smile-showcase", Color = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", ImageCount = 30 }
            };
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