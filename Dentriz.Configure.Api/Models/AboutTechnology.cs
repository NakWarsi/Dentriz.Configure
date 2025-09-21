namespace Dentriz.Configure.Api.Models
{
    public class AboutTechnology
    {
        public string Id { get; set; } = "about-technology";
        public string SectionTitle { get; set; } = "Advanced Technology & Facilities";
        public string SectionSubtitle { get; set; } = "We're proud to offer an array of leading technologies to ensure your smile receives the tailored care it deserves!";
        public List<Technology> Technologies { get; set; } = new List<Technology>();
        public string SectionTitleColor { get; set; } = "#2c5aa0";
        public string SectionSubtitleColor { get; set; } = "#666666";
        public string TechTitleColor { get; set; } = "#2c5aa0";
        public string TechDescriptionColor { get; set; } = "#333333";
        public string BackgroundColor { get; set; } = "#ffffff";
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SectionSubtitleFontFamily { get; set; } = "Arial, sans-serif";
        public string TechTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string TechDescriptionFontFamily { get; set; } = "Arial, sans-serif";
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string Version { get; set; } = "1.0";
    }

    public class Technology
    {
        public string Icon { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
