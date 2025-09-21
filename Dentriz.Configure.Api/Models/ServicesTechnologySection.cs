using System.ComponentModel.DataAnnotations;

namespace Dentriz.Configure.Api.Models
{
    public class TechnologyItem
    {
        public string Icon { get; set; } = "";
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
    }

    public class ServicesTechnologySection
    {
        [Required]
        public string Id { get; set; } = "services-technology-section";

        [Required]
        public string SectionTitle { get; set; } = "Advanced Technology";

        [Required]
        public string SectionSubtitle { get; set; } = "We invest in the latest dental technology to provide you with the best care possible";

        public List<TechnologyItem> Technologies { get; set; } = new List<TechnologyItem>
        {
            new TechnologyItem
            {
                Icon = "🖥️",
                Title = "CEREC Same-Day Crowns",
                Description = "Get your crown in a single visit with our advanced CEREC technology."
            },
            new TechnologyItem
            {
                Icon = "📷",
                Title = "Digital X-Rays",
                Description = "Lower radiation exposure and instant results with digital imaging."
            },
            new TechnologyItem
            {
                Icon = "🔍",
                Title = "CBCT Scanner",
                Description = "3D imaging for precise implant planning and comprehensive diagnostics."
            },
            new TechnologyItem
            {
                Icon = "💻",
                Title = "PrimeScan Technology",
                Description = "Cloud-based scanning for accurate digital impressions and treatment planning."
            }
        };

        // Styling
        public string SectionTitleColor { get; set; } = "#ffffff";
        public string SectionSubtitleColor { get; set; } = "#ffffff";
        public string BackgroundColor { get; set; } = "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)";
        public string CardTitleColor { get; set; } = "#ffffff";
        public string CardDescriptionColor { get; set; } = "#ffffff";

        // Fonts
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SectionSubtitleFontFamily { get; set; } = "Arial, sans-serif";
        public string CardTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string CardDescriptionFontFamily { get; set; } = "Arial, sans-serif";
    }
}
