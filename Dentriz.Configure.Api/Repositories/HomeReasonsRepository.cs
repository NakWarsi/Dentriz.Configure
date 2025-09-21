using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IHomeReasonsRepository
    {
        Task<HomeReasons?> GetHomeReasonsAsync();
        Task<HomeReasons> CreateOrUpdateHomeReasonsAsync(HomeReasons reasons);
        Task<bool> DeleteHomeReasonsAsync();
    }

    public class HomeReasonsRepository : BaseRepository<dynamic>, IHomeReasonsRepository
    {
        private readonly ICosmosDbConfigurationService _configService;

        public HomeReasonsRepository(Container container, ILogger<HomeReasonsRepository> logger, ICosmosDbConfigurationService configService)
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<HomeReasons?> GetHomeReasonsAsync()
        {
            try
            {
                var config = _configService.GetHomeReasonsDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new HomeReasons
                {
                    Id = doc.id ?? config.DocumentId,
                    SectionTitle = doc.sectionTitle ?? "Why Choose DentRiz Dental Clinic in Pune",
                    SectionIntro = doc.sectionIntro ?? "At <strong>DentRiz Dental Clinic</strong>, we believe every patient deserves a healthy, confident smile. Here's why families in Wakad, Hinjewadi, and across Pune trust us for their dental care:",
                    Reason1Icon = doc.reason1Icon ?? "🦷",
                    Reason1Title = doc.reason1Title ?? "Comprehensive Dental Care for Every Smile",
                    Reason1Items = ParseStringList(doc.reason1Items),
                    Reason2Icon = doc.reason2Icon ?? "⚡",
                    Reason2Title = doc.reason2Title ?? "Modern & Advanced Dental Treatments",
                    Reason2Items = ParseStringList(doc.reason2Items),
                    Reason3Icon = doc.reason3Icon ?? "❤️",
                    Reason3Title = doc.reason3Title ?? "Trusted Local Dental Clinic in Wakad & Hinjewadi",
                    Reason3Items = ParseStringList(doc.reason3Items),
                    Reason4Icon = doc.reason4Icon ?? "🌿",
                    Reason4Title = doc.reason4Title ?? "Comfortable & Stress-Free Environment",
                    Reason4Items = ParseStringList(doc.reason4Items),
                    Reason5Icon = doc.reason5Icon ?? "🧼",
                    Reason5Title = doc.reason5Title ?? "Uncompromised Hygiene & Safety",
                    Reason5Items = ParseStringList(doc.reason5Items),
                    Reason6Icon = doc.reason6Icon ?? "💳",
                    Reason6Title = doc.reason6Title ?? "Accessible & Affordable Care",
                    Reason6Items = ParseStringList(doc.reason6Items),
                    SectionTitleColor = doc.sectionTitleColor ?? "#2c5aa0",
                    SectionIntroColor = doc.sectionIntroColor ?? "#333333",
                    Reason1TitleColor = doc.reason1TitleColor ?? "#2c5aa0",
                    Reason1ItemsColor = doc.reason1ItemsColor ?? "#333333",
                    Reason2TitleColor = doc.reason2TitleColor ?? "#2c5aa0",
                    Reason2ItemsColor = doc.reason2ItemsColor ?? "#333333",
                    Reason3TitleColor = doc.reason3TitleColor ?? "#2c5aa0",
                    Reason3ItemsColor = doc.reason3ItemsColor ?? "#333333",
                    Reason4TitleColor = doc.reason4TitleColor ?? "#2c5aa0",
                    Reason4ItemsColor = doc.reason4ItemsColor ?? "#333333",
                    Reason5TitleColor = doc.reason5TitleColor ?? "#2c5aa0",
                    Reason5ItemsColor = doc.reason5ItemsColor ?? "#333333",
                    Reason6TitleColor = doc.reason6TitleColor ?? "#2c5aa0",
                    Reason6ItemsColor = doc.reason6ItemsColor ?? "#333333",
                    BackgroundColor = doc.backgroundColor ?? "rgb(255,255,255)",
                    SectionTitleFontFamily = doc.sectionTitleFontFamily ?? "Arial, sans-serif",
                    SectionIntroFontFamily = doc.sectionIntroFontFamily ?? "Arial, sans-serif",
                    Reason1TitleFontFamily = doc.reason1TitleFontFamily ?? "Arial, sans-serif",
                    Reason1ItemsFontFamily = doc.reason1ItemsFontFamily ?? "Arial, sans-serif",
                    Reason2TitleFontFamily = doc.reason2TitleFontFamily ?? "Arial, sans-serif",
                    Reason2ItemsFontFamily = doc.reason2ItemsFontFamily ?? "Arial, sans-serif",
                    Reason3TitleFontFamily = doc.reason3TitleFontFamily ?? "Arial, sans-serif",
                    Reason3ItemsFontFamily = doc.reason3ItemsFontFamily ?? "Arial, sans-serif",
                    Reason4TitleFontFamily = doc.reason4TitleFontFamily ?? "Arial, sans-serif",
                    Reason4ItemsFontFamily = doc.reason4ItemsFontFamily ?? "Arial, sans-serif",
                    Reason5TitleFontFamily = doc.reason5TitleFontFamily ?? "Arial, sans-serif",
                    Reason5ItemsFontFamily = doc.reason5ItemsFontFamily ?? "Arial, sans-serif",
                    Reason6TitleFontFamily = doc.reason6TitleFontFamily ?? "Arial, sans-serif",
                    Reason6ItemsFontFamily = doc.reason6ItemsFontFamily ?? "Arial, sans-serif"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving home reasons config from repository");
                throw;
            }
        }

        public async Task<HomeReasons> CreateOrUpdateHomeReasonsAsync(HomeReasons reasons)
        {
            try
            {
                var docConfig = _configService.GetHomeReasonsDocumentConfig();
                reasons.Id = docConfig.DocumentId;

                var document = new
                {
                    id = reasons.Id,
                    sectionTitle = reasons.SectionTitle,
                    sectionIntro = reasons.SectionIntro,
                    reason1Icon = reasons.Reason1Icon,
                    reason1Title = reasons.Reason1Title,
                    reason1Items = reasons.Reason1Items,
                    reason2Icon = reasons.Reason2Icon,
                    reason2Title = reasons.Reason2Title,
                    reason2Items = reasons.Reason2Items,
                    reason3Icon = reasons.Reason3Icon,
                    reason3Title = reasons.Reason3Title,
                    reason3Items = reasons.Reason3Items,
                    reason4Icon = reasons.Reason4Icon,
                    reason4Title = reasons.Reason4Title,
                    reason4Items = reasons.Reason4Items,
                    reason5Icon = reasons.Reason5Icon,
                    reason5Title = reasons.Reason5Title,
                    reason5Items = reasons.Reason5Items,
                    reason6Icon = reasons.Reason6Icon,
                    reason6Title = reasons.Reason6Title,
                    reason6Items = reasons.Reason6Items,
                    sectionTitleColor = reasons.SectionTitleColor,
                    sectionIntroColor = reasons.SectionIntroColor,
                    reason1TitleColor = reasons.Reason1TitleColor,
                    reason1ItemsColor = reasons.Reason1ItemsColor,
                    reason2TitleColor = reasons.Reason2TitleColor,
                    reason2ItemsColor = reasons.Reason2ItemsColor,
                    reason3TitleColor = reasons.Reason3TitleColor,
                    reason3ItemsColor = reasons.Reason3ItemsColor,
                    reason4TitleColor = reasons.Reason4TitleColor,
                    reason4ItemsColor = reasons.Reason4ItemsColor,
                    reason5TitleColor = reasons.Reason5TitleColor,
                    reason5ItemsColor = reasons.Reason5ItemsColor,
                    reason6TitleColor = reasons.Reason6TitleColor,
                    reason6ItemsColor = reasons.Reason6ItemsColor,
                    backgroundColor = reasons.BackgroundColor,
                    sectionTitleFontFamily = reasons.SectionTitleFontFamily,
                    sectionIntroFontFamily = reasons.SectionIntroFontFamily,
                    reason1TitleFontFamily = reasons.Reason1TitleFontFamily,
                    reason1ItemsFontFamily = reasons.Reason1ItemsFontFamily,
                    reason2TitleFontFamily = reasons.Reason2TitleFontFamily,
                    reason2ItemsFontFamily = reasons.Reason2ItemsFontFamily,
                    reason3TitleFontFamily = reasons.Reason3TitleFontFamily,
                    reason3ItemsFontFamily = reasons.Reason3ItemsFontFamily,
                    reason4TitleFontFamily = reasons.Reason4TitleFontFamily,
                    reason4ItemsFontFamily = reasons.Reason4ItemsFontFamily,
                    reason5TitleFontFamily = reasons.Reason5TitleFontFamily,
                    reason5ItemsFontFamily = reasons.Reason5ItemsFontFamily,
                    reason6TitleFontFamily = reasons.Reason6TitleFontFamily,
                    reason6ItemsFontFamily = reasons.Reason6ItemsFontFamily
                };

                await CreateOrUpdateAsync(document, docConfig.DocumentId, docConfig.PartitionKey);
                return reasons;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving home reasons config to repository");
                throw;
            }
        }

        public async Task<bool> DeleteHomeReasonsAsync()
        {
            var config = _configService.GetHomeReasonsDocumentConfig();
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
