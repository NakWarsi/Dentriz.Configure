using System.ComponentModel.DataAnnotations;

namespace Dentriz.Configure.Api.Models
{
    public class HomeServices
    {
        [Required]
        public string Id { get; set; } = "home-services";

        [Required]
        public string SectionTitle { get; set; } = "Comprehensive Dental Services in Wakad & Hinjewadi";

        [Required]
        public string Service1Title { get; set; } = "🦷 Preventive Care & Dental Cleaning in Wakad";

        public List<string> Service1Items { get; set; } = new List<string>
        {
            "Professional teeth cleaning & polishing",
            "Pediatric dentistry for children",
            "Oral health education & cavity prevention",
            "Family dentistry in Wakad & Hinjewadi"
        };

        [Required]
        public string Service1ButtonText { get; set; } = "Learn More";

        [Required]
        public string Service2Title { get; set; } = "🔧 Restorative Care & Dental Implants in Wakad";

        public List<string> Service2Items { get; set; } = new List<string>
        {
            "Advanced dental implants in Pune",
            "Dental crowns & bridges",
            "Tooth-colored fillings",
            "Emergency dental treatments"
        };

        [Required]
        public string Service2ButtonText { get; set; } = "Learn More";

        [Required]
        public string Service3Title { get; set; } = "✨ Cosmetic Dentistry in Wakad";

        public List<string> Service3Items { get; set; } = new List<string>
        {
            "Teeth whitening & smile makeovers",
            "Invisalign® & clear aligners",
            "Dental veneers & bonding",
            "Cosmetic contouring"
        };

        [Required]
        public string Service3ButtonText { get; set; } = "Learn More";

        [Required]
        public string Service4Title { get; set; } = "😃 Orthodontics & Braces";

        public List<string> Service4Items { get; set; } = new List<string>
        {
            "Metal & ceramic braces",
            "Invisalign® clear aligners",
            "Early orthodontic care for children",
            "Jaw alignment treatments"
        };

        [Required]
        public string Service4ButtonText { get; set; } = "Learn More";

        [Required]
        public string Service5Title { get; set; } = "👶 Pediatric Dentistry";

        public List<string> Service5Items { get; set; } = new List<string>
        {
            "Gentle dental care for children",
            "Preventive sealants & fluoride treatments",
            "Habit counseling (thumb sucking, mouth breathing)",
            "Space maintainers for growing smiles"
        };

        [Required]
        public string Service5ButtonText { get; set; } = "Learn More";

        [Required]
        public string Service6Title { get; set; } = "🌿 Gum & Periodontal Care";

        public List<string> Service6Items { get; set; } = new List<string>
        {
            "Treatment for bleeding gums",
            "Scaling & root planing",
            "Laser gum treatments",
            "Periodontal maintenance therapy"
        };

        [Required]
        public string Service6ButtonText { get; set; } = "Learn More";

        [Required]
        public string Service7Title { get; set; } = "🔨 Oral Surgery & Extractions";

        public List<string> Service7Items { get; set; } = new List<string>
        {
            "Wisdom tooth removal",
            "Tooth extractions with minimal pain",
            "Minor oral surgical procedures",
            "Bone grafting for implants"
        };

        [Required]
        public string Service7ButtonText { get; set; } = "Learn More";

        [Required]
        public string Service8Title { get; set; } = "🛡️ Root Canal & Endodontics";

        public List<string> Service8Items { get; set; } = new List<string>
        {
            "Painless root canal treatment",
            "Single-sitting RCT options",
            "Retreatment of failed RCT",
            "Post & core build-up"
        };

        [Required]
        public string Service8ButtonText { get; set; } = "Learn More";

        [Required]
        public string Service9Title { get; set; } = "🚑 Emergency Dental Care";

        public List<string> Service9Items { get; set; } = new List<string>
        {
            "Immediate pain relief treatments",
            "Broken tooth repair",
            "Knocked-out tooth management",
            "Same-day emergency appointments"
        };

        [Required]
        public string Service9ButtonText { get; set; } = "Learn More";

        // Styling
        public string SectionTitleColor { get; set; } = "#2c5aa0";
        public string Service1TitleColor { get; set; } = "#2c5aa0";
        public string Service1ItemsColor { get; set; } = "#333333";
        public string Service1ButtonColor { get; set; } = "#2c5aa0";
        public string Service2TitleColor { get; set; } = "#2c5aa0";
        public string Service2ItemsColor { get; set; } = "#333333";
        public string Service2ButtonColor { get; set; } = "#2c5aa0";
        public string Service3TitleColor { get; set; } = "#2c5aa0";
        public string Service3ItemsColor { get; set; } = "#333333";
        public string Service3ButtonColor { get; set; } = "#2c5aa0";
        public string Service4TitleColor { get; set; } = "#2c5aa0";
        public string Service4ItemsColor { get; set; } = "#333333";
        public string Service4ButtonColor { get; set; } = "#2c5aa0";
        public string Service5TitleColor { get; set; } = "#2c5aa0";
        public string Service5ItemsColor { get; set; } = "#333333";
        public string Service5ButtonColor { get; set; } = "#2c5aa0";
        public string Service6TitleColor { get; set; } = "#2c5aa0";
        public string Service6ItemsColor { get; set; } = "#333333";
        public string Service6ButtonColor { get; set; } = "#2c5aa0";
        public string Service7TitleColor { get; set; } = "#2c5aa0";
        public string Service7ItemsColor { get; set; } = "#333333";
        public string Service7ButtonColor { get; set; } = "#2c5aa0";
        public string Service8TitleColor { get; set; } = "#2c5aa0";
        public string Service8ItemsColor { get; set; } = "#333333";
        public string Service8ButtonColor { get; set; } = "#2c5aa0";
        public string Service9TitleColor { get; set; } = "#2c5aa0";
        public string Service9ItemsColor { get; set; } = "#333333";
        public string Service9ButtonColor { get; set; } = "#2c5aa0";
        public string BackgroundColor { get; set; } = "rgb(255,255,255)";

        // Fonts
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Service1TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Service1ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Service1ButtonFontFamily { get; set; } = "Arial, sans-serif";
        public string Service2TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Service2ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Service2ButtonFontFamily { get; set; } = "Arial, sans-serif";
        public string Service3TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Service3ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Service3ButtonFontFamily { get; set; } = "Arial, sans-serif";
        public string Service4TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Service4ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Service4ButtonFontFamily { get; set; } = "Arial, sans-serif";
        public string Service5TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Service5ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Service5ButtonFontFamily { get; set; } = "Arial, sans-serif";
        public string Service6TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Service6ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Service6ButtonFontFamily { get; set; } = "Arial, sans-serif";
        public string Service7TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Service7ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Service7ButtonFontFamily { get; set; } = "Arial, sans-serif";
        public string Service8TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Service8ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Service8ButtonFontFamily { get; set; } = "Arial, sans-serif";
        public string Service9TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Service9ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Service9ButtonFontFamily { get; set; } = "Arial, sans-serif";
    }
}
