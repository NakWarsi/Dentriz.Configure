using System.ComponentModel.DataAnnotations;

namespace Dentriz.Configure.Api.Models
{
    public class ServicesHero
    {
        [Required]
        public string Id { get; set; } = "services-hero";

        [Required]
        public string Title { get; set; } = "Complete Dental Care Under One Roof";

        [Required]
        public string Subtitle { get; set; } = "Comprehensive dental care including cosmetic dentistry, dental implants, and family dentistry in Wakad and Hinjewadi";

        // Styling
        public string TitleColor { get; set; } = "#1e3c72";
        public string SubtitleColor { get; set; } = "#666666";
        public string BackgroundColor { get; set; } = "rgb(231, 241, 235)";

        // Fonts
        public string TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SubtitleFontFamily { get; set; } = "Arial, sans-serif";
    }
}
