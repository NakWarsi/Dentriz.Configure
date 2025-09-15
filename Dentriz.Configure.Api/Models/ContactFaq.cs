namespace Dentriz.Configure.Api.Models
{
    public class ContactFaq
    {
        public string Id { get; set; } = "contact-faq";
        public string SectionTitle { get; set; } = "Frequently Asked Questions";
        public string SectionSubtitle { get; set; } = "Find answers to common questions about our services";
        public List<FaqItem> FaqItems { get; set; } = new List<FaqItem>();
        public string SectionTitleColor { get; set; } = "#2c5aa0";
        public string SectionSubtitleColor { get; set; } = "#666666";
        public string QuestionColor { get; set; } = "#2c5aa0";
        public string AnswerColor { get; set; } = "#333333";
        public string BackgroundColor { get; set; } = "#f8f9fa";
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SectionSubtitleFontFamily { get; set; } = "Arial, sans-serif";
        public string QuestionFontFamily { get; set; } = "Arial, sans-serif";
        public string AnswerFontFamily { get; set; } = "Arial, sans-serif";
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string Version { get; set; } = "1.0";
    }

    public class FaqItem
    {
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
    }
}
