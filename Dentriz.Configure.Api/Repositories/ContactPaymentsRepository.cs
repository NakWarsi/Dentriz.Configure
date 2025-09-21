using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IContactPaymentsRepository
    {
        Task<ContactPayments?> GetContactPaymentsAsync();
        Task<ContactPayments> CreateOrUpdateContactPaymentsAsync(ContactPayments config);
        Task<bool> DeleteContactPaymentsAsync();
    }

    public class ContactPaymentsRepository : BaseRepository<dynamic>, IContactPaymentsRepository
    {
        private const string DOCUMENT_ID = "contact-payments";
        private const string PARTITION_KEY = "contact-payments";

        public ContactPaymentsRepository(Container container, ILogger<ContactPaymentsRepository> logger) 
            : base(container, logger)
        {
        }

        public async Task<ContactPayments?> GetContactPaymentsAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new ContactPayments
                {
                    Id = doc.id ?? DOCUMENT_ID,
                    SectionTitle = doc.sectionTitle ?? "Insurance & Payment Options",
                    SectionSubtitle = doc.sectionSubtitle ?? "We make dental care accessible and affordable",
                    InsuranceIcon = doc.insuranceIcon ?? "🏥",
                    InsuranceTitle = doc.insuranceTitle ?? "Insurance Plans",
                    InsuranceDescription = doc.insuranceDescription ?? "We accept most major insurance plans and will help you understand your coverage. Our team will file claims on your behalf to make the process as smooth as possible.",
                    InsuranceItems = ParseStringList(doc.insuranceItems),
                    PaymentIcon = doc.paymentIcon ?? "💳",
                    PaymentTitle = doc.paymentTitle ?? "Payment Options",
                    PaymentDescription = doc.paymentDescription ?? "We offer flexible payment options to make dental care affordable for everyone. We accept various payment methods and can work with you to create a payment plan.",
                    PaymentItems = ParseStringList(doc.paymentItems),
                    SpecialIcon = doc.specialIcon ?? "📋",
                    SpecialTitle = doc.specialTitle ?? "New Patient Special",
                    SpecialDescription = doc.specialDescription ?? "New to our practice? Take advantage of our new patient special and start your journey to a healthier smile today.",
                    SpecialItems = ParseStringList(doc.specialItems),
                    SectionTitleColor = doc.sectionTitleColor ?? "#2c5aa0",
                    SectionSubtitleColor = doc.sectionSubtitleColor ?? "#666666",
                    CardTitleColor = doc.cardTitleColor ?? "#2c5aa0",
                    CardDescriptionColor = doc.cardDescriptionColor ?? "#333333",
                    CardItemColor = doc.cardItemColor ?? "#333333",
                    BackgroundColor = doc.backgroundColor ?? "#f8f9fa",
                    SectionTitleFontFamily = doc.sectionTitleFontFamily ?? "Arial, sans-serif",
                    SectionSubtitleFontFamily = doc.sectionSubtitleFontFamily ?? "Arial, sans-serif",
                    CardTitleFontFamily = doc.cardTitleFontFamily ?? "Arial, sans-serif",
                    CardDescriptionFontFamily = doc.cardDescriptionFontFamily ?? "Arial, sans-serif",
                    CardItemFontFamily = doc.cardItemFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contact payments from repository");
                throw;
            }
        }

        public async Task<ContactPayments> CreateOrUpdateContactPaymentsAsync(ContactPayments config)
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
                    insuranceIcon = config.InsuranceIcon,
                    insuranceTitle = config.InsuranceTitle,
                    insuranceDescription = config.InsuranceDescription,
                    insuranceItems = config.InsuranceItems,
                    paymentIcon = config.PaymentIcon,
                    paymentTitle = config.PaymentTitle,
                    paymentDescription = config.PaymentDescription,
                    paymentItems = config.PaymentItems,
                    specialIcon = config.SpecialIcon,
                    specialTitle = config.SpecialTitle,
                    specialDescription = config.SpecialDescription,
                    specialItems = config.SpecialItems,
                    sectionTitleColor = config.SectionTitleColor,
                    sectionSubtitleColor = config.SectionSubtitleColor,
                    cardTitleColor = config.CardTitleColor,
                    cardDescriptionColor = config.CardDescriptionColor,
                    cardItemColor = config.CardItemColor,
                    backgroundColor = config.BackgroundColor,
                    sectionTitleFontFamily = config.SectionTitleFontFamily,
                    sectionSubtitleFontFamily = config.SectionSubtitleFontFamily,
                    cardTitleFontFamily = config.CardTitleFontFamily,
                    cardDescriptionFontFamily = config.CardDescriptionFontFamily,
                    cardItemFontFamily = config.CardItemFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving contact payments to repository");
                throw;
            }
        }

        public async Task<bool> DeleteContactPaymentsAsync()
        {
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }

        private List<string> ParseStringList(dynamic items)
        {
            try
            {
                if (items == null)
                {
                    return new List<string>();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(items);
                var itemsList = System.Text.Json.JsonSerializer.Deserialize<List<string>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return itemsList ?? new List<string>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing string list from Cosmos DB");
                return new List<string>();
            }
        }
    }
}
