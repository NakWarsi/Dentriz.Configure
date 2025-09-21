using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IServicesTechnologySectionRepository
    {
        Task<ServicesTechnologySection?> GetServicesTechnologySectionAsync();
        Task<ServicesTechnologySection> CreateOrUpdateServicesTechnologySectionAsync(ServicesTechnologySection technologySection);
        Task<bool> DeleteServicesTechnologySectionAsync();
    }

    public class ServicesTechnologySectionRepository : BaseRepository<dynamic>, IServicesTechnologySectionRepository
    {
        private readonly ICosmosDbConfigurationService _configService;

        public ServicesTechnologySectionRepository(Container container, ILogger<ServicesTechnologySectionRepository> logger, ICosmosDbConfigurationService configService)
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<ServicesTechnologySection?> GetServicesTechnologySectionAsync()
        {
            try
            {
                var config = _configService.GetServicesTechnologySectionDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new ServicesTechnologySection
                {
                    Id = doc.id ?? config.DocumentId,
                    SectionTitle = doc.sectionTitle ?? "Advanced Technology",
                    SectionSubtitle = doc.sectionSubtitle ?? "We invest in the latest dental technology to provide you with the best care possible",
                    Technologies = ParseTechnologies(doc.technologies),
                    SectionTitleColor = doc.sectionTitleColor ?? "#ffffff",
                    SectionSubtitleColor = doc.sectionSubtitleColor ?? "#ffffff",
                    BackgroundColor = doc.backgroundColor ?? "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                    CardTitleColor = doc.cardTitleColor ?? "#ffffff",
                    CardDescriptionColor = doc.cardDescriptionColor ?? "#ffffff",
                    SectionTitleFontFamily = doc.sectionTitleFontFamily ?? "Arial, sans-serif",
                    SectionSubtitleFontFamily = doc.sectionSubtitleFontFamily ?? "Arial, sans-serif",
                    CardTitleFontFamily = doc.cardTitleFontFamily ?? "Arial, sans-serif",
                    CardDescriptionFontFamily = doc.cardDescriptionFontFamily ?? "Arial, sans-serif"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving services technology section config from repository");
                throw;
            }
        }

        public async Task<ServicesTechnologySection> CreateOrUpdateServicesTechnologySectionAsync(ServicesTechnologySection technologySection)
        {
            try
            {
                var docConfig = _configService.GetServicesTechnologySectionDocumentConfig();
                technologySection.Id = docConfig.DocumentId;

                var document = new
                {
                    id = technologySection.Id,
                    sectionTitle = technologySection.SectionTitle,
                    sectionSubtitle = technologySection.SectionSubtitle,
                    technologies = technologySection.Technologies,
                    sectionTitleColor = technologySection.SectionTitleColor,
                    sectionSubtitleColor = technologySection.SectionSubtitleColor,
                    backgroundColor = technologySection.BackgroundColor,
                    cardTitleColor = technologySection.CardTitleColor,
                    cardDescriptionColor = technologySection.CardDescriptionColor,
                    sectionTitleFontFamily = technologySection.SectionTitleFontFamily,
                    sectionSubtitleFontFamily = technologySection.SectionSubtitleFontFamily,
                    cardTitleFontFamily = technologySection.CardTitleFontFamily,
                    cardDescriptionFontFamily = technologySection.CardDescriptionFontFamily
                };

                await CreateOrUpdateAsync(document, docConfig.DocumentId, docConfig.PartitionKey);
                return technologySection;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving services technology section config to repository");
                throw;
            }
        }

        public async Task<bool> DeleteServicesTechnologySectionAsync()
        {
            var config = _configService.GetServicesTechnologySectionDocumentConfig();
            return await DeleteAsync(config.DocumentId, config.PartitionKey);
        }

        private List<TechnologyItem> ParseTechnologies(dynamic technologies)
        {
            try
            {
                if (technologies == null)
                {
                    _logger.LogInformation("Technologies is null in Cosmos DB document");
                    return new List<TechnologyItem>();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(technologies);
                var techItems = System.Text.Json.JsonSerializer.Deserialize<List<TechnologyItem>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return techItems ?? new List<TechnologyItem>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing technologies from Cosmos DB");
                return new List<TechnologyItem>();
            }
        }
    }
}
