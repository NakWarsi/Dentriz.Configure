using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IAboutValuesRepository
    {
        Task<AboutValues?> GetAboutValuesAsync();
        Task<AboutValues> CreateOrUpdateAboutValuesAsync(AboutValues config);
        Task<bool> DeleteAboutValuesAsync();
    }

    public class AboutValuesRepository : BaseRepository<dynamic>, IAboutValuesRepository
    {
        private const string DOCUMENT_ID = "about-values";
        private const string PARTITION_KEY = "about-values";

        public AboutValuesRepository(Container container, ILogger<AboutValuesRepository> logger) 
            : base(container, logger)
        {
        }

        public async Task<AboutValues?> GetAboutValuesAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new AboutValues
                {
                    Id = doc.id ?? DOCUMENT_ID,
                    SectionTitle = doc.sectionTitle ?? "Our Core Values",
                    Values = ParseValues(doc.values),
                    SectionTitleColor = doc.sectionTitleColor ?? "#2c5aa0",
                    ValueTitleColor = doc.valueTitleColor ?? "#2c5aa0",
                    ValueDescriptionColor = doc.valueDescriptionColor ?? "#333333",
                    BackgroundColor = doc.backgroundColor ?? "#f8f9fa",
                    SectionTitleFontFamily = doc.sectionTitleFontFamily ?? "Arial, sans-serif",
                    ValueTitleFontFamily = doc.valueTitleFontFamily ?? "Arial, sans-serif",
                    ValueDescriptionFontFamily = doc.valueDescriptionFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving about values from repository");
                throw;
            }
        }

        public async Task<AboutValues> CreateOrUpdateAboutValuesAsync(AboutValues config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                config.Id = DOCUMENT_ID;

                var document = new
                {
                    id = config.Id,
                    sectionTitle = config.SectionTitle,
                    values = config.Values,
                    sectionTitleColor = config.SectionTitleColor,
                    valueTitleColor = config.ValueTitleColor,
                    valueDescriptionColor = config.ValueDescriptionColor,
                    backgroundColor = config.BackgroundColor,
                    sectionTitleFontFamily = config.SectionTitleFontFamily,
                    valueTitleFontFamily = config.ValueTitleFontFamily,
                    valueDescriptionFontFamily = config.ValueDescriptionFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving about values to repository");
                throw;
            }
        }

        public async Task<bool> DeleteAboutValuesAsync()
        {
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }

        private List<Value> ParseValues(dynamic values)
        {
            try
            {
                if (values == null)
                {
                    return GetDefaultValues();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(values);
                var valueList = System.Text.Json.JsonSerializer.Deserialize<List<Value>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return valueList ?? GetDefaultValues();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing values from Cosmos DB");
                return GetDefaultValues();
            }
        }

        private List<Value> GetDefaultValues()
        {
            return new List<Value>
            {
                new Value
                {
                    Icon = "❤️",
                    Title = "Compassionate Care",
                    Description = "We treat every patient with kindness, respect, and understanding, creating a comfortable environment for all."
                },
                new Value
                {
                    Icon = "🔬",
                    Title = "Advanced Technology",
                    Description = "We invest in the latest dental technology to provide precise, efficient, and comfortable treatments."
                },
                new Value
                {
                    Icon = "👨‍👩‍👧‍👦",
                    Title = "Family Focused",
                    Description = "We welcome patients of all ages and provide comprehensive care for the entire family under one roof."
                },
                new Value
                {
                    Icon = "🎯",
                    Title = "Excellence",
                    Description = "We maintain the highest standards of dental care and continuously improve our skills and techniques."
                }
            };
        }
    }
}
