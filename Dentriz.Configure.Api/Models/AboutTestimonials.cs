namespace Dentriz.Configure.Api.Models
{
    public class AboutTestimonials
    {
        public string Id { get; set; } = "about-testimonials";
        public string SectionTitle { get; set; } = "What Our Patients Say";
        public string SectionSubtitle { get; set; } = "Read some of our amazing patient reviews and then contact us to experience our care for yourself!";
        public List<Testimonial> Testimonials { get; set; } = new List<Testimonial>();
        public string SectionTitleColor { get; set; } = "#2c5aa0";
        public string SectionSubtitleColor { get; set; } = "#666666";
        public string TestimonialTextColor { get; set; } = "#333333";
        public string TestimonialAuthorNameColor { get; set; } = "#2c5aa0";
        public string TestimonialAuthorTitleColor { get; set; } = "#666666";
        public string TestimonialStarsColor { get; set; } = "#ffd700";
        public string BackgroundColor { get; set; } = "#f8f9fa";
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SectionSubtitleFontFamily { get; set; } = "Arial, sans-serif";
        public string TestimonialTextFontFamily { get; set; } = "Arial, sans-serif";
        public string TestimonialAuthorNameFontFamily { get; set; } = "Arial, sans-serif";
        public string TestimonialAuthorTitleFontFamily { get; set; } = "Arial, sans-serif";
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string Version { get; set; } = "1.0";
    }

    public class Testimonial
    {
        public string Stars { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string AuthorName { get; set; } = string.Empty;
        public string AuthorTitle { get; set; } = string.Empty;
    }
}
