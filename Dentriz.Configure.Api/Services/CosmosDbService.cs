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
    }

    public class CosmosDbService : ICosmosDbService
    {
        private readonly CosmosClient _cosmosClient;
        private readonly Container _container;
        private readonly ILogger<CosmosDbService> _logger;

        public CosmosDbService(IConfiguration configuration, ILogger<CosmosDbService> logger)
        {
            _logger = logger;
            
            var connectionString = configuration.GetConnectionString("CosmosDB");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("CosmosDB connection string is not configured");
            }

            _cosmosClient = new CosmosClient(connectionString);
            
            var databaseName = configuration["CosmosDB:DatabaseName"] ?? "DentrizConfigure";
            var containerName = configuration["CosmosDB:ContainerName"] ?? "Configurations";
            
            _container = _cosmosClient.GetContainer(databaseName, containerName);
        }

        public async Task<HeaderConfig?> GetHeaderConfigAsync()
        {
            try
            {
                var response = await _container.ReadItemAsync<dynamic>(
                    id: "header-config",
                    partitionKey: new PartitionKey("header-config")
                );

                var doc = response.Resource;
                
                // Debug: Log the raw document to see what's actually in Cosmos DB
                //_logger.LogInformation("Raw document from Cosmos DB: {Document}", System.Text.Json.JsonSerializer.Serialize(doc));
                
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

                var response = await _container.UpsertItemAsync(
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
                await _container.DeleteItemAsync<HeaderConfig>(
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

        private List<NavItem> ParseNavItems(dynamic navItems)
        {
            try
            {
                if (navItems == null)
                {
                    _logger.LogInformation("NavItems is null in Cosmos DB document");
                    return new List<NavItem>();
                }

                // Log what we're trying to parse
                var jsonString = System.Text.Json.JsonSerializer.Serialize(navItems);
                //_logger.LogInformation("NavItems JSON from Cosmos DB: {NavItemsJson}", jsonString);

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

                //_logger.LogInformation("Direct deserialization result: {Count} items", directItems?.Count ?? 0);
                return directItems ?? new List<NavItem>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing navigation items from Cosmos DB");
                return new List<NavItem>();
            }
        }
    }
}
