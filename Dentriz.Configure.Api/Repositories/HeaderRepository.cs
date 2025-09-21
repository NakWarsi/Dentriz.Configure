using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IHeaderRepository
    {
        Task<HeaderConfig?> GetHeaderConfigAsync();
        Task<HeaderConfig> CreateOrUpdateHeaderConfigAsync(HeaderConfig config);
        Task<bool> DeleteHeaderConfigAsync();
    }

    public class HeaderRepository : BaseRepository<dynamic>, IHeaderRepository
    {
        private const string DOCUMENT_ID = "header-config";
        private const string PARTITION_KEY = "header-config";

        public HeaderRepository(Container container, ILogger<HeaderRepository> logger) 
            : base(container, logger)
        {
        }

        public async Task<HeaderConfig?> GetHeaderConfigAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new HeaderConfig
                {
                    Id = doc.id ?? DOCUMENT_ID,
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
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving header config from repository");
                throw;
            }
        }

        public async Task<HeaderConfig> CreateOrUpdateHeaderConfigAsync(HeaderConfig config)
        {
            try
            {
                // Set metadata
                config.LastUpdated = DateTime.UtcNow;
                config.Id = DOCUMENT_ID;

                // Create document structure
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

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving header config to repository");
                throw;
            }
        }

        public async Task<bool> DeleteHeaderConfigAsync()
        {
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
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
    }
}
