using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Dentriz.Configure.Api.Models
{
    public class GalleryStats
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = "gallery-stats";

        [JsonPropertyName("galleryStats")]
        public List<StatItem> GalleryStatsList { get; set; } = new List<StatItem>();

        [JsonPropertyName("statNumberColor")]
        public string StatNumberColor { get; set; } = "#1e3c72";

        [JsonPropertyName("statLabelColor")]
        public string StatLabelColor { get; set; } = "#666666";

        [JsonPropertyName("backgroundColor")]
        public string BackgroundColor { get; set; } = "#f8f9fa";

        [JsonPropertyName("statNumberFontFamily")]
        public string StatNumberFontFamily { get; set; } = "Arial, sans-serif";

        [JsonPropertyName("statLabelFontFamily")]
        public string StatLabelFontFamily { get; set; } = "Arial, sans-serif";

        [JsonPropertyName("lastUpdated")]
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("version")]
        public string Version { get; set; } = "1.0";
    }

    public class StatItem
    {
        [Required]
        [JsonPropertyName("number")]
        public string Number { get; set; } = string.Empty;

        [Required]
        [JsonPropertyName("label")]
        public string Label { get; set; } = string.Empty;
    }
}

