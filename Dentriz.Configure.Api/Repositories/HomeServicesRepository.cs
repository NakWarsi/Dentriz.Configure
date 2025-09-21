using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IHomeServicesRepository
    {
        Task<HomeServices?> GetHomeServicesAsync();
        Task<HomeServices> CreateOrUpdateHomeServicesAsync(HomeServices services);
        Task<bool> DeleteHomeServicesAsync();
    }

    public class HomeServicesRepository : BaseRepository<dynamic>, IHomeServicesRepository
    {
        private readonly ICosmosDbConfigurationService _configService;

        public HomeServicesRepository(Container container, ILogger<HomeServicesRepository> logger, ICosmosDbConfigurationService configService)
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<HomeServices?> GetHomeServicesAsync()
        {
            try
            {
                var config = _configService.GetHomeServicesDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new HomeServices
                {
                    Id = doc.id ?? config.DocumentId,
                    SectionTitle = doc.sectionTitle ?? "Comprehensive Dental Services in Wakad & Hinjewadi",
                    Service1Title = doc.service1Title ?? "🦷 Preventive Care & Dental Cleaning in Wakad",
                    Service1Items = ParseStringList(doc.service1Items),
                    Service1ButtonText = doc.service1ButtonText ?? "Learn More",
                    Service2Title = doc.service2Title ?? "🔧 Restorative Care & Dental Implants in Wakad",
                    Service2Items = ParseStringList(doc.service2Items),
                    Service2ButtonText = doc.service2ButtonText ?? "Learn More",
                    Service3Title = doc.service3Title ?? "✨ Cosmetic Dentistry in Wakad",
                    Service3Items = ParseStringList(doc.service3Items),
                    Service3ButtonText = doc.service3ButtonText ?? "Learn More",
                    Service4Title = doc.service4Title ?? "😃 Orthodontics & Braces",
                    Service4Items = ParseStringList(doc.service4Items),
                    Service4ButtonText = doc.service4ButtonText ?? "Learn More",
                    Service5Title = doc.service5Title ?? "👶 Pediatric Dentistry",
                    Service5Items = ParseStringList(doc.service5Items),
                    Service5ButtonText = doc.service5ButtonText ?? "Learn More",
                    Service6Title = doc.service6Title ?? "🌿 Gum & Periodontal Care",
                    Service6Items = ParseStringList(doc.service6Items),
                    Service6ButtonText = doc.service6ButtonText ?? "Learn More",
                    Service7Title = doc.service7Title ?? "🔨 Oral Surgery & Extractions",
                    Service7Items = ParseStringList(doc.service7Items),
                    Service7ButtonText = doc.service7ButtonText ?? "Learn More",
                    Service8Title = doc.service8Title ?? "🛡️ Root Canal & Endodontics",
                    Service8Items = ParseStringList(doc.service8Items),
                    Service8ButtonText = doc.service8ButtonText ?? "Learn More",
                    Service9Title = doc.service9Title ?? "🚑 Emergency Dental Care",
                    Service9Items = ParseStringList(doc.service9Items),
                    Service9ButtonText = doc.service9ButtonText ?? "Learn More",
                    SectionTitleColor = doc.sectionTitleColor ?? "#2c5aa0",
                    Service1TitleColor = doc.service1TitleColor ?? "#2c5aa0",
                    Service1ItemsColor = doc.service1ItemsColor ?? "#333333",
                    Service1ButtonColor = doc.service1ButtonColor ?? "#2c5aa0",
                    Service2TitleColor = doc.service2TitleColor ?? "#2c5aa0",
                    Service2ItemsColor = doc.service2ItemsColor ?? "#333333",
                    Service2ButtonColor = doc.service2ButtonColor ?? "#2c5aa0",
                    Service3TitleColor = doc.service3TitleColor ?? "#2c5aa0",
                    Service3ItemsColor = doc.service3ItemsColor ?? "#333333",
                    Service3ButtonColor = doc.service3ButtonColor ?? "#2c5aa0",
                    Service4TitleColor = doc.service4TitleColor ?? "#2c5aa0",
                    Service4ItemsColor = doc.service4ItemsColor ?? "#333333",
                    Service4ButtonColor = doc.service4ButtonColor ?? "#2c5aa0",
                    Service5TitleColor = doc.service5TitleColor ?? "#2c5aa0",
                    Service5ItemsColor = doc.service5ItemsColor ?? "#333333",
                    Service5ButtonColor = doc.service5ButtonColor ?? "#2c5aa0",
                    Service6TitleColor = doc.service6TitleColor ?? "#2c5aa0",
                    Service6ItemsColor = doc.service6ItemsColor ?? "#333333",
                    Service6ButtonColor = doc.service6ButtonColor ?? "#2c5aa0",
                    Service7TitleColor = doc.service7TitleColor ?? "#2c5aa0",
                    Service7ItemsColor = doc.service7ItemsColor ?? "#333333",
                    Service7ButtonColor = doc.service7ButtonColor ?? "#2c5aa0",
                    Service8TitleColor = doc.service8TitleColor ?? "#2c5aa0",
                    Service8ItemsColor = doc.service8ItemsColor ?? "#333333",
                    Service8ButtonColor = doc.service8ButtonColor ?? "#2c5aa0",
                    Service9TitleColor = doc.service9TitleColor ?? "#2c5aa0",
                    Service9ItemsColor = doc.service9ItemsColor ?? "#333333",
                    Service9ButtonColor = doc.service9ButtonColor ?? "#2c5aa0",
                    BackgroundColor = doc.backgroundColor ?? "rgb(255,255,255)",
                    SectionTitleFontFamily = doc.sectionTitleFontFamily ?? "Arial, sans-serif",
                    Service1TitleFontFamily = doc.service1TitleFontFamily ?? "Arial, sans-serif",
                    Service1ItemsFontFamily = doc.service1ItemsFontFamily ?? "Arial, sans-serif",
                    Service1ButtonFontFamily = doc.service1ButtonFontFamily ?? "Arial, sans-serif",
                    Service2TitleFontFamily = doc.service2TitleFontFamily ?? "Arial, sans-serif",
                    Service2ItemsFontFamily = doc.service2ItemsFontFamily ?? "Arial, sans-serif",
                    Service2ButtonFontFamily = doc.service2ButtonFontFamily ?? "Arial, sans-serif",
                    Service3TitleFontFamily = doc.service3TitleFontFamily ?? "Arial, sans-serif",
                    Service3ItemsFontFamily = doc.service3ItemsFontFamily ?? "Arial, sans-serif",
                    Service3ButtonFontFamily = doc.service3ButtonFontFamily ?? "Arial, sans-serif",
                    Service4TitleFontFamily = doc.service4TitleFontFamily ?? "Arial, sans-serif",
                    Service4ItemsFontFamily = doc.service4ItemsFontFamily ?? "Arial, sans-serif",
                    Service4ButtonFontFamily = doc.service4ButtonFontFamily ?? "Arial, sans-serif",
                    Service5TitleFontFamily = doc.service5TitleFontFamily ?? "Arial, sans-serif",
                    Service5ItemsFontFamily = doc.service5ItemsFontFamily ?? "Arial, sans-serif",
                    Service5ButtonFontFamily = doc.service5ButtonFontFamily ?? "Arial, sans-serif",
                    Service6TitleFontFamily = doc.service6TitleFontFamily ?? "Arial, sans-serif",
                    Service6ItemsFontFamily = doc.service6ItemsFontFamily ?? "Arial, sans-serif",
                    Service6ButtonFontFamily = doc.service6ButtonFontFamily ?? "Arial, sans-serif",
                    Service7TitleFontFamily = doc.service7TitleFontFamily ?? "Arial, sans-serif",
                    Service7ItemsFontFamily = doc.service7ItemsFontFamily ?? "Arial, sans-serif",
                    Service7ButtonFontFamily = doc.service7ButtonFontFamily ?? "Arial, sans-serif",
                    Service8TitleFontFamily = doc.service8TitleFontFamily ?? "Arial, sans-serif",
                    Service8ItemsFontFamily = doc.service8ItemsFontFamily ?? "Arial, sans-serif",
                    Service8ButtonFontFamily = doc.service8ButtonFontFamily ?? "Arial, sans-serif",
                    Service9TitleFontFamily = doc.service9TitleFontFamily ?? "Arial, sans-serif",
                    Service9ItemsFontFamily = doc.service9ItemsFontFamily ?? "Arial, sans-serif",
                    Service9ButtonFontFamily = doc.service9ButtonFontFamily ?? "Arial, sans-serif"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving home services config from repository");
                throw;
            }
        }

        public async Task<HomeServices> CreateOrUpdateHomeServicesAsync(HomeServices services)
        {
            try
            {
                var docConfig = _configService.GetHomeServicesDocumentConfig();
                services.Id = docConfig.DocumentId;

                var document = new
                {
                    id = services.Id,
                    sectionTitle = services.SectionTitle,
                    service1Title = services.Service1Title,
                    service1Items = services.Service1Items,
                    service1ButtonText = services.Service1ButtonText,
                    service2Title = services.Service2Title,
                    service2Items = services.Service2Items,
                    service2ButtonText = services.Service2ButtonText,
                    service3Title = services.Service3Title,
                    service3Items = services.Service3Items,
                    service3ButtonText = services.Service3ButtonText,
                    service4Title = services.Service4Title,
                    service4Items = services.Service4Items,
                    service4ButtonText = services.Service4ButtonText,
                    service5Title = services.Service5Title,
                    service5Items = services.Service5Items,
                    service5ButtonText = services.Service5ButtonText,
                    service6Title = services.Service6Title,
                    service6Items = services.Service6Items,
                    service6ButtonText = services.Service6ButtonText,
                    service7Title = services.Service7Title,
                    service7Items = services.Service7Items,
                    service7ButtonText = services.Service7ButtonText,
                    service8Title = services.Service8Title,
                    service8Items = services.Service8Items,
                    service8ButtonText = services.Service8ButtonText,
                    service9Title = services.Service9Title,
                    service9Items = services.Service9Items,
                    service9ButtonText = services.Service9ButtonText,
                    sectionTitleColor = services.SectionTitleColor,
                    service1TitleColor = services.Service1TitleColor,
                    service1ItemsColor = services.Service1ItemsColor,
                    service1ButtonColor = services.Service1ButtonColor,
                    service2TitleColor = services.Service2TitleColor,
                    service2ItemsColor = services.Service2ItemsColor,
                    service2ButtonColor = services.Service2ButtonColor,
                    service3TitleColor = services.Service3TitleColor,
                    service3ItemsColor = services.Service3ItemsColor,
                    service3ButtonColor = services.Service3ButtonColor,
                    service4TitleColor = services.Service4TitleColor,
                    service4ItemsColor = services.Service4ItemsColor,
                    service4ButtonColor = services.Service4ButtonColor,
                    service5TitleColor = services.Service5TitleColor,
                    service5ItemsColor = services.Service5ItemsColor,
                    service5ButtonColor = services.Service5ButtonColor,
                    service6TitleColor = services.Service6TitleColor,
                    service6ItemsColor = services.Service6ItemsColor,
                    service6ButtonColor = services.Service6ButtonColor,
                    service7TitleColor = services.Service7TitleColor,
                    service7ItemsColor = services.Service7ItemsColor,
                    service7ButtonColor = services.Service7ButtonColor,
                    service8TitleColor = services.Service8TitleColor,
                    service8ItemsColor = services.Service8ItemsColor,
                    service8ButtonColor = services.Service8ButtonColor,
                    service9TitleColor = services.Service9TitleColor,
                    service9ItemsColor = services.Service9ItemsColor,
                    service9ButtonColor = services.Service9ButtonColor,
                    backgroundColor = services.BackgroundColor,
                    sectionTitleFontFamily = services.SectionTitleFontFamily,
                    service1TitleFontFamily = services.Service1TitleFontFamily,
                    service1ItemsFontFamily = services.Service1ItemsFontFamily,
                    service1ButtonFontFamily = services.Service1ButtonFontFamily,
                    service2TitleFontFamily = services.Service2TitleFontFamily,
                    service2ItemsFontFamily = services.Service2ItemsFontFamily,
                    service2ButtonFontFamily = services.Service2ButtonFontFamily,
                    service3TitleFontFamily = services.Service3TitleFontFamily,
                    service3ItemsFontFamily = services.Service3ItemsFontFamily,
                    service3ButtonFontFamily = services.Service3ButtonFontFamily,
                    service4TitleFontFamily = services.Service4TitleFontFamily,
                    service4ItemsFontFamily = services.Service4ItemsFontFamily,
                    service4ButtonFontFamily = services.Service4ButtonFontFamily,
                    service5TitleFontFamily = services.Service5TitleFontFamily,
                    service5ItemsFontFamily = services.Service5ItemsFontFamily,
                    service5ButtonFontFamily = services.Service5ButtonFontFamily,
                    service6TitleFontFamily = services.Service6TitleFontFamily,
                    service6ItemsFontFamily = services.Service6ItemsFontFamily,
                    service6ButtonFontFamily = services.Service6ButtonFontFamily,
                    service7TitleFontFamily = services.Service7TitleFontFamily,
                    service7ItemsFontFamily = services.Service7ItemsFontFamily,
                    service7ButtonFontFamily = services.Service7ButtonFontFamily,
                    service8TitleFontFamily = services.Service8TitleFontFamily,
                    service8ItemsFontFamily = services.Service8ItemsFontFamily,
                    service8ButtonFontFamily = services.Service8ButtonFontFamily,
                    service9TitleFontFamily = services.Service9TitleFontFamily,
                    service9ItemsFontFamily = services.Service9ItemsFontFamily,
                    service9ButtonFontFamily = services.Service9ButtonFontFamily
                };

                await CreateOrUpdateAsync(document, docConfig.DocumentId, docConfig.PartitionKey);
                return services;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving home services config to repository");
                throw;
            }
        }

        public async Task<bool> DeleteHomeServicesAsync()
        {
            var config = _configService.GetHomeServicesDocumentConfig();
            return await DeleteAsync(config.DocumentId, config.PartitionKey);
        }

        private List<string> ParseStringList(dynamic list)
        {
            try
            {
                if (list == null)
                {
                    _logger.LogInformation("List is null in Cosmos DB document");
                    return new List<string>();
                }

                var jsonString = JsonSerializer.Serialize(list);
                var items = JsonSerializer.Deserialize<List<string>>(jsonString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return items ?? new List<string>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing string list from Cosmos DB");
                return new List<string>();
            }
        }
    }
}
