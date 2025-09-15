using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Dentriz.Configure.Api.Models
{
    public class GalleryContent
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = "gallery-content";

        [JsonPropertyName("gallerySections")]
        public List<GallerySection> GallerySections { get; set; } = new List<GallerySection>();

        [JsonPropertyName("cardTitleColor")]
        public string CardTitleColor { get; set; } = "#1e3c72";

        [JsonPropertyName("cardDescriptionColor")]
        public string CardDescriptionColor { get; set; } = "#666666";

        [JsonPropertyName("placeholderTextColor")]
        public string PlaceholderTextColor { get; set; } = "#ffffff";

        [JsonPropertyName("imageCountColor")]
        public string ImageCountColor { get; set; } = "#ffffff";

        [JsonPropertyName("backgroundColor")]
        public string BackgroundColor { get; set; } = "transparent";

        [JsonPropertyName("cardBackgroundColor")]
        public string CardBackgroundColor { get; set; } = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

        [JsonPropertyName("cardTitleFontFamily")]
        public string CardTitleFontFamily { get; set; } = "Arial, sans-serif";

        [JsonPropertyName("cardDescriptionFontFamily")]
        public string CardDescriptionFontFamily { get; set; } = "Arial, sans-serif";

        [JsonPropertyName("placeholderTextFontFamily")]
        public string PlaceholderTextFontFamily { get; set; } = "Arial, sans-serif";

        [JsonPropertyName("imageCountFontFamily")]
        public string ImageCountFontFamily { get; set; } = "Arial, sans-serif";

        [JsonPropertyName("lastUpdated")]
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("version")]
        public string Version { get; set; } = "1.0";
    }

    public class GallerySection
    {
        [Required]
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [Required]
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [JsonPropertyName("route")]
        public string Route { get; set; } = string.Empty;

        [JsonPropertyName("color")]
        public string Color { get; set; } = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

        [JsonPropertyName("imageCount")]
        public int ImageCount { get; set; } = 0;
    }
}

