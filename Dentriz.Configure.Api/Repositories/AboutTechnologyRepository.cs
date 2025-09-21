using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IAboutTechnologyRepository
    {
        Task<AboutTechnology?> GetAboutTechnologyAsync();
        Task<AboutTechnology> CreateOrUpdateAboutTechnologyAsync(AboutTechnology config);
        Task<bool> DeleteAboutTechnologyAsync();
    }

    public class AboutTechnologyRepository : BaseRepository<dynamic>, IAboutTechnologyRepository
    {
        private const string DOCUMENT_ID = "about-technology";
        private const string PARTITION_KEY = "about-technology";

        public AboutTechnologyRepository(Container container, ILogger<AboutTechnologyRepository> logger) 
            : base(container, logger)
        {
        }

        public async Task<AboutTechnology?> GetAboutTechnologyAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new AboutTechnology
                {
                    Id = doc.id ?? DOCUMENT_ID,
                    SectionTitle = doc.sectionTitle ?? "Advanced Technology & Facilities",
                    SectionSubtitle = doc.sectionSubtitle ?? "We're proud to offer an array of leading technologies to ensure your smile receives the tailored care it deserves!",
                    Technologies = ParseTechnologies(doc.technologies),
                    SectionTitleColor = doc.sectionTitleColor ?? "#2c5aa0",
                    SectionSubtitleColor = doc.sectionSubtitleColor ?? "#666666",
                    TechTitleColor = doc.techTitleColor ?? "#2c5aa0",
                    TechDescriptionColor = doc.techDescriptionColor ?? "#333333",
                    BackgroundColor = doc.backgroundColor ?? "#ffffff",
                    SectionTitleFontFamily = doc.sectionTitleFontFamily ?? "Arial, sans-serif",
                    SectionSubtitleFontFamily = doc.sectionSubtitleFontFamily ?? "Arial, sans-serif",
                    TechTitleFontFamily = doc.techTitleFontFamily ?? "Arial, sans-serif",
                    TechDescriptionFontFamily = doc.techDescriptionFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving about technology from repository");
                throw;
            }
        }

        public async Task<AboutTechnology> CreateOrUpdateAboutTechnologyAsync(AboutTechnology config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                config.Id = DOCUMENT_ID;

                var document = new
                {
                    id = config.Id,
                    sectionTitle = config.SectionTitle,
                    sectionSubtitle = config.SectionSubtitle,
                    technologies = config.Technologies,
                    sectionTitleColor = config.SectionTitleColor,
                    sectionSubtitleColor = config.SectionSubtitleColor,
                    techTitleColor = config.TechTitleColor,
                    techDescriptionColor = config.TechDescriptionColor,
                    backgroundColor = config.BackgroundColor,
                    sectionTitleFontFamily = config.SectionTitleFontFamily,
                    sectionSubtitleFontFamily = config.SectionSubtitleFontFamily,
                    techTitleFontFamily = config.TechTitleFontFamily,
                    techDescriptionFontFamily = config.TechDescriptionFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving about technology to repository");
                throw;
            }
        }

        public async Task<bool> DeleteAboutTechnologyAsync()
        {
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }

        private List<Technology> ParseTechnologies(dynamic technologies)
        {
            try
            {
                if (technologies == null)
                {
                    return GetDefaultTechnologies();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(technologies);
                var technologyList = System.Text.Json.JsonSerializer.Deserialize<List<Technology>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return technologyList ?? GetDefaultTechnologies();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing technologies from Cosmos DB");
                return GetDefaultTechnologies();
            }
        }

        private List<Technology> GetDefaultTechnologies()
        {
            return new List<Technology>
            {
                new Technology
                {
                    Icon = "🖥️",
                    Title = "CEREC Same-Day Crowns",
                    Description = "Get your crown in a single visit with our advanced CEREC technology."
                },
                new Technology
                {
                    Icon = "📷",
                    Title = "CBCT Scanner",
                    Description = "3D imaging for comprehensive oral health insights and implant planning accuracy."
                },
                new Technology
                {
                    Icon = "💻",
                    Title = "PrimeScan Technology",
                    Description = "Cloud-based scanning for accurate digital impressions and treatment planning."
                },
                new Technology
                {
                    Icon = "🦷",
                    Title = "Digital X-Rays",
                    Description = "Lower radiation exposure and instant results with digital imaging."
                }
            };
        }
    }
}
