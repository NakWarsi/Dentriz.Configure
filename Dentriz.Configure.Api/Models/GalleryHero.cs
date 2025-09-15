using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Dentriz.Configure.Api.Models
{
    public class GalleryHero
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = "gallery-hero";

        [Required]
        [JsonPropertyName("galleryTitle")]
        public string GalleryTitle { get; set; } = "Dentriz Dental Clinic - Smile Gallery";

        [Required]
        [JsonPropertyName("gallerySubtitle")]
        public string GallerySubtitle { get; set; } = "Cosmetic dentistry in Wakad and dental implants in Pune. Professional teeth whitening in Wakad and veneers in Wakad at DentRiz Dental Clinic - the top dentist in Pune.";

        [JsonPropertyName("galleryTitleColor")]
        public string GalleryTitleColor { get; set; } = "#1e3c72";

        [JsonPropertyName("gallerySubtitleColor")]
        public string GallerySubtitleColor { get; set; } = "#666666";

        [JsonPropertyName("backgroundColor")]
        public string BackgroundColor { get; set; } = "rgb(231, 241, 235)";

        [JsonPropertyName("galleryTitleFontFamily")]
        public string GalleryTitleFontFamily { get; set; } = "Arial, sans-serif";

        [JsonPropertyName("gallerySubtitleFontFamily")]
        public string GallerySubtitleFontFamily { get; set; } = "Arial, sans-serif";

        [JsonPropertyName("lastUpdated")]
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("version")]
        public string Version { get; set; } = "1.0";
    }
}

