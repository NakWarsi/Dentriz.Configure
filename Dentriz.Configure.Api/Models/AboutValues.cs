namespace Dentriz.Configure.Api.Models
{
    public class AboutValues
    {
        public string Id { get; set; } = "about-values";
        public string SectionTitle { get; set; } = "Our Core Values";
        public List<Value> Values { get; set; } = new List<Value>();
        public string SectionTitleColor { get; set; } = "#2c5aa0";
        public string ValueTitleColor { get; set; } = "#2c5aa0";
        public string ValueDescriptionColor { get; set; } = "#333333";
        public string BackgroundColor { get; set; } = "#f8f9fa";
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string ValueTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string ValueDescriptionFontFamily { get; set; } = "Arial, sans-serif";
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string Version { get; set; } = "1.0";
    }

    public class Value
    {
        public string Icon { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
