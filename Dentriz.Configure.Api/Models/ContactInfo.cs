namespace Dentriz.Configure.Api.Models
{
    public class ContactInfo
    {
        public string Id { get; set; } = "contact-info";
        public string PhoneTitle { get; set; } = "Phone";
        public string PhoneNote { get; set; } = "Call us for any enquiry";
        public string PhoneButtonText { get; set; } = "📞 Inquiries";
        public string PhoneNumber { get; set; } = "932-144-9313";
        public string EmailTitle { get; set; } = "Email";
        public string EmailNote { get; set; } = "Send us a message anytime";
        public string EmailButtonText { get; set; } = "📧 Send Email";
        public string EmailAddress { get; set; } = "rzwarsi707@gmail.com";
        public string AddressTitle { get; set; } = "Address";
        public string AddressNote { get; set; } = "Best dental clinic in Pune";
        public string AddressButtonText { get; set; } = "📍 Get Directions";
        public string AddressLink { get; set; } = "https://maps.app.goo.gl/4qYJf5jwSWNNExSQ8";
        public string EmergencyTitle { get; set; } = "Emergency";
        public string EmergencyNote { get; set; } = "24/7 emergency care";
        public string EmergencyButtonText { get; set; } = "🚨 Emergency Call";
        public string EmergencyNumber { get; set; } = "750-616-8095";
        public string PhoneTitleColor { get; set; } = "#2c5aa0";
        public string PhoneNoteColor { get; set; } = "#666666";
        public string PhoneButtonColor { get; set; } = "#007bff";
        public string EmailTitleColor { get; set; } = "#2c5aa0";
        public string EmailNoteColor { get; set; } = "#666666";
        public string EmailButtonColor { get; set; } = "#28a745";
        public string AddressTitleColor { get; set; } = "#2c5aa0";
        public string AddressNoteColor { get; set; } = "#666666";
        public string AddressButtonColor { get; set; } = "#6c757d";
        public string EmergencyTitleColor { get; set; } = "#2c5aa0";
        public string EmergencyNoteColor { get; set; } = "#666666";
        public string EmergencyButtonColor { get; set; } = "#dc3545";
        public string BackgroundColor { get; set; } = "#ffffff";
        public string PhoneTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string PhoneNoteFontFamily { get; set; } = "Arial, sans-serif";
        public string PhoneButtonFontFamily { get; set; } = "Arial, sans-serif";
        public string EmailTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string EmailNoteFontFamily { get; set; } = "Arial, sans-serif";
        public string EmailButtonFontFamily { get; set; } = "Arial, sans-serif";
        public string AddressTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string AddressNoteFontFamily { get; set; } = "Arial, sans-serif";
        public string AddressButtonFontFamily { get; set; } = "Arial, sans-serif";
        public string EmergencyTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string EmergencyNoteFontFamily { get; set; } = "Arial, sans-serif";
        public string EmergencyButtonFontFamily { get; set; } = "Arial, sans-serif";
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string Version { get; set; } = "1.0";
    }
}
