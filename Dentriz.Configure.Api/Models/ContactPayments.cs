namespace Dentriz.Configure.Api.Models
{
    public class ContactPayments
    {
        public string Id { get; set; } = "contact-payments";
        public string SectionTitle { get; set; } = "Insurance & Payment Options";
        public string SectionSubtitle { get; set; } = "We make dental care accessible and affordable";
        public string InsuranceIcon { get; set; } = "🏥";
        public string InsuranceTitle { get; set; } = "Insurance Plans";
        public string InsuranceDescription { get; set; } = "We accept most major insurance plans and will help you understand your coverage. Our team will file claims on your behalf to make the process as smooth as possible.";
        public List<string> InsuranceItems { get; set; } = new List<string>();
        public string PaymentIcon { get; set; } = "💳";
        public string PaymentTitle { get; set; } = "Payment Options";
        public string PaymentDescription { get; set; } = "We offer flexible payment options to make dental care affordable for everyone. We accept various payment methods and can work with you to create a payment plan.";
        public List<string> PaymentItems { get; set; } = new List<string>();
        public string SpecialIcon { get; set; } = "📋";
        public string SpecialTitle { get; set; } = "New Patient Special";
        public string SpecialDescription { get; set; } = "New to our practice? Take advantage of our new patient special and start your journey to a healthier smile today.";
        public List<string> SpecialItems { get; set; } = new List<string>();
        public string SectionTitleColor { get; set; } = "#2c5aa0";
        public string SectionSubtitleColor { get; set; } = "#666666";
        public string CardTitleColor { get; set; } = "#2c5aa0";
        public string CardDescriptionColor { get; set; } = "#333333";
        public string CardItemColor { get; set; } = "#333333";
        public string BackgroundColor { get; set; } = "#f8f9fa";
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SectionSubtitleFontFamily { get; set; } = "Arial, sans-serif";
        public string CardTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string CardDescriptionFontFamily { get; set; } = "Arial, sans-serif";
        public string CardItemFontFamily { get; set; } = "Arial, sans-serif";
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string Version { get; set; } = "1.0";
    }
}
