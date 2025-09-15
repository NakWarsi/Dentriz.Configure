using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IContactInfoRepository
    {
        Task<ContactInfo?> GetContactInfoAsync();
        Task<ContactInfo> CreateOrUpdateContactInfoAsync(ContactInfo config);
        Task<bool> DeleteContactInfoAsync();
    }

    public class ContactInfoRepository : BaseRepository<dynamic>, IContactInfoRepository
    {
        private const string DOCUMENT_ID = "contact-info";
        private const string PARTITION_KEY = "contact-info";

        public ContactInfoRepository(Container container, ILogger<ContactInfoRepository> logger) 
            : base(container, logger)
        {
        }

        public async Task<ContactInfo?> GetContactInfoAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new ContactInfo
                {
                    Id = doc.id ?? DOCUMENT_ID,
                    PhoneTitle = doc.phoneTitle ?? "Phone",
                    PhoneNote = doc.phoneNote ?? "Call us for any enquiry",
                    PhoneButtonText = doc.phoneButtonText ?? "📞 Inquiries",
                    PhoneNumber = doc.phoneNumber ?? "932-144-9313",
                    EmailTitle = doc.emailTitle ?? "Email",
                    EmailNote = doc.emailNote ?? "Send us a message anytime",
                    EmailButtonText = doc.emailButtonText ?? "📧 Send Email",
                    EmailAddress = doc.emailAddress ?? "rzwarsi707@gmail.com",
                    AddressTitle = doc.addressTitle ?? "Address",
                    AddressNote = doc.addressNote ?? "Best dental clinic in Pune",
                    AddressButtonText = doc.addressButtonText ?? "📍 Get Directions",
                    AddressLink = doc.addressLink ?? "https://maps.app.goo.gl/4qYJf5jwSWNNExSQ8",
                    EmergencyTitle = doc.emergencyTitle ?? "Emergency",
                    EmergencyNote = doc.emergencyNote ?? "24/7 emergency care",
                    EmergencyButtonText = doc.emergencyButtonText ?? "🚨 Emergency Call",
                    EmergencyNumber = doc.emergencyNumber ?? "750-616-8095",
                    PhoneTitleColor = doc.phoneTitleColor ?? "#2c5aa0",
                    PhoneNoteColor = doc.phoneNoteColor ?? "#666666",
                    PhoneButtonColor = doc.phoneButtonColor ?? "#007bff",
                    EmailTitleColor = doc.emailTitleColor ?? "#2c5aa0",
                    EmailNoteColor = doc.emailNoteColor ?? "#666666",
                    EmailButtonColor = doc.emailButtonColor ?? "#28a745",
                    AddressTitleColor = doc.addressTitleColor ?? "#2c5aa0",
                    AddressNoteColor = doc.addressNoteColor ?? "#666666",
                    AddressButtonColor = doc.addressButtonColor ?? "#6c757d",
                    EmergencyTitleColor = doc.emergencyTitleColor ?? "#2c5aa0",
                    EmergencyNoteColor = doc.emergencyNoteColor ?? "#666666",
                    EmergencyButtonColor = doc.emergencyButtonColor ?? "#dc3545",
                    BackgroundColor = doc.backgroundColor ?? "#ffffff",
                    PhoneTitleFontFamily = doc.phoneTitleFontFamily ?? "Arial, sans-serif",
                    PhoneNoteFontFamily = doc.phoneNoteFontFamily ?? "Arial, sans-serif",
                    PhoneButtonFontFamily = doc.phoneButtonFontFamily ?? "Arial, sans-serif",
                    EmailTitleFontFamily = doc.emailTitleFontFamily ?? "Arial, sans-serif",
                    EmailNoteFontFamily = doc.emailNoteFontFamily ?? "Arial, sans-serif",
                    EmailButtonFontFamily = doc.emailButtonFontFamily ?? "Arial, sans-serif",
                    AddressTitleFontFamily = doc.addressTitleFontFamily ?? "Arial, sans-serif",
                    AddressNoteFontFamily = doc.addressNoteFontFamily ?? "Arial, sans-serif",
                    AddressButtonFontFamily = doc.addressButtonFontFamily ?? "Arial, sans-serif",
                    EmergencyTitleFontFamily = doc.emergencyTitleFontFamily ?? "Arial, sans-serif",
                    EmergencyNoteFontFamily = doc.emergencyNoteFontFamily ?? "Arial, sans-serif",
                    EmergencyButtonFontFamily = doc.emergencyButtonFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contact info from repository");
                throw;
            }
        }

        public async Task<ContactInfo> CreateOrUpdateContactInfoAsync(ContactInfo config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                config.Id = DOCUMENT_ID;

                var document = new
                {
                    id = config.Id,
                    phoneTitle = config.PhoneTitle,
                    phoneNote = config.PhoneNote,
                    phoneButtonText = config.PhoneButtonText,
                    phoneNumber = config.PhoneNumber,
                    emailTitle = config.EmailTitle,
                    emailNote = config.EmailNote,
                    emailButtonText = config.EmailButtonText,
                    emailAddress = config.EmailAddress,
                    addressTitle = config.AddressTitle,
                    addressNote = config.AddressNote,
                    addressButtonText = config.AddressButtonText,
                    addressLink = config.AddressLink,
                    emergencyTitle = config.EmergencyTitle,
                    emergencyNote = config.EmergencyNote,
                    emergencyButtonText = config.EmergencyButtonText,
                    emergencyNumber = config.EmergencyNumber,
                    phoneTitleColor = config.PhoneTitleColor,
                    phoneNoteColor = config.PhoneNoteColor,
                    phoneButtonColor = config.PhoneButtonColor,
                    emailTitleColor = config.EmailTitleColor,
                    emailNoteColor = config.EmailNoteColor,
                    emailButtonColor = config.EmailButtonColor,
                    addressTitleColor = config.AddressTitleColor,
                    addressNoteColor = config.AddressNoteColor,
                    addressButtonColor = config.AddressButtonColor,
                    emergencyTitleColor = config.EmergencyTitleColor,
                    emergencyNoteColor = config.EmergencyNoteColor,
                    emergencyButtonColor = config.EmergencyButtonColor,
                    backgroundColor = config.BackgroundColor,
                    phoneTitleFontFamily = config.PhoneTitleFontFamily,
                    phoneNoteFontFamily = config.PhoneNoteFontFamily,
                    phoneButtonFontFamily = config.PhoneButtonFontFamily,
                    emailTitleFontFamily = config.EmailTitleFontFamily,
                    emailNoteFontFamily = config.EmailNoteFontFamily,
                    emailButtonFontFamily = config.EmailButtonFontFamily,
                    addressTitleFontFamily = config.AddressTitleFontFamily,
                    addressNoteFontFamily = config.AddressNoteFontFamily,
                    addressButtonFontFamily = config.AddressButtonFontFamily,
                    emergencyTitleFontFamily = config.EmergencyTitleFontFamily,
                    emergencyNoteFontFamily = config.EmergencyNoteFontFamily,
                    emergencyButtonFontFamily = config.EmergencyButtonFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving contact info to repository");
                throw;
            }
        }

        public async Task<bool> DeleteContactInfoAsync()
        {
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }
    }
}
