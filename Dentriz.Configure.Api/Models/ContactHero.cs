namespace Dentriz.Configure.Api.Models
{
    public class ContactHero
    {
        public string Id { get; set; } = "contact-hero";
        public string HeroTitle { get; set; } = "Contact the Best Dentists in Pune";
        public string HeroSubtitle { get; set; } = "Get in touch with DentRiz Dental Clinic and it's associated Doctors";
        public string HeroTitleColor { get; set; } = "#2c5aa0";
        public string HeroSubtitleColor { get; set; } = "#333333";
        public string HeroTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string HeroSubtitleFontFamily { get; set; } = "Arial, sans-serif";
        public string BackgroundColor { get; set; } = "#f8f9fa";
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string Version { get; set; } = "1.0";
    }
}
