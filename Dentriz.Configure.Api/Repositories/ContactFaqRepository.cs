using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IContactFaqRepository
    {
        Task<ContactFaq?> GetContactFaqAsync();
        Task<ContactFaq> CreateOrUpdateContactFaqAsync(ContactFaq config);
        Task<bool> DeleteContactFaqAsync();
    }

    public class ContactFaqRepository : BaseRepository<dynamic>, IContactFaqRepository
    {
        private readonly ICosmosDbConfigurationService _configService;

        public ContactFaqRepository(Container container, ILogger<ContactFaqRepository> logger, ICosmosDbConfigurationService configService) 
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<ContactFaq?> GetContactFaqAsync()
        {
            try
            {
                var config = _configService.GetContactFaqDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new ContactFaq
                {
                    Id = doc.id ?? config.DocumentId,
                    SectionTitle = doc.sectionTitle ?? "Frequently Asked Questions",
                    SectionSubtitle = doc.sectionSubtitle ?? "Find answers to common questions about our services",
                    FaqItems = ParseFaqItems(doc.faqItems),
                    SectionTitleColor = doc.sectionTitleColor ?? "#2c5aa0",
                    SectionSubtitleColor = doc.sectionSubtitleColor ?? "#666666",
                    QuestionColor = doc.questionColor ?? "#2c5aa0",
                    AnswerColor = doc.answerColor ?? "#333333",
                    BackgroundColor = doc.backgroundColor ?? "#f8f9fa",
                    SectionTitleFontFamily = doc.sectionTitleFontFamily ?? "Arial, sans-serif",
                    SectionSubtitleFontFamily = doc.sectionSubtitleFontFamily ?? "Arial, sans-serif",
                    QuestionFontFamily = doc.questionFontFamily ?? "Arial, sans-serif",
                    AnswerFontFamily = doc.answerFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contact FAQ from repository");
                throw;
            }
        }

        public async Task<ContactFaq> CreateOrUpdateContactFaqAsync(ContactFaq config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                var docConfig = _configService.GetContactFaqDocumentConfig();
                config.Id = docConfig.DocumentId;

                var document = new
                {
                    id = config.Id,
                    sectionTitle = config.SectionTitle,
                    sectionSubtitle = config.SectionSubtitle,
                    faqItems = config.FaqItems,
                    sectionTitleColor = config.SectionTitleColor,
                    sectionSubtitleColor = config.SectionSubtitleColor,
                    questionColor = config.QuestionColor,
                    answerColor = config.AnswerColor,
                    backgroundColor = config.BackgroundColor,
                    sectionTitleFontFamily = config.SectionTitleFontFamily,
                    sectionSubtitleFontFamily = config.SectionSubtitleFontFamily,
                    questionFontFamily = config.QuestionFontFamily,
                    answerFontFamily = config.AnswerFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, docConfig.DocumentId, docConfig.PartitionKey);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving contact FAQ to repository");
                throw;
            }
        }

        public async Task<bool> DeleteContactFaqAsync()
        {
            var config = _configService.GetContactFaqDocumentConfig();
            return await DeleteAsync(config.DocumentId, config.PartitionKey);
        }

        private List<FaqItem> ParseFaqItems(dynamic faqItems)
        {
            try
            {
                if (faqItems == null)
                {
                    return GetDefaultFaqItems();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(faqItems);
                var faqList = System.Text.Json.JsonSerializer.Deserialize<List<FaqItem>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return faqList ?? GetDefaultFaqItems();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing FAQ items from Cosmos DB");
                return GetDefaultFaqItems();
            }
        }

        private List<FaqItem> GetDefaultFaqItems()
        {
            return new List<FaqItem>
            {
                new FaqItem
                {
                    Question = "How do I schedule an appointment?",
                    Answer = "You can schedule an appointment by calling us at (750) 616-8095, or you can request an appointment through our website. We'll work with you to find a convenient time."
                },
                new FaqItem
                {
                    Question = "What should I bring to my first appointment?",
                    Answer = "Please bring your ID, insurance card (if applicable), and any relevant medical history. You can also download and fill out our new patient forms from our website."
                },
                new FaqItem
                {
                    Question = "Do you offer emergency dental care?",
                    Answer = "Yes, we provide emergency dental care. If you have a dental emergency, please call us immediately at (555) 123-4567, and we'll help you get the care you need."
                }
            };
        }
    }
}
