using System.ComponentModel.DataAnnotations;

namespace Dentriz.Configure.Api.Models
{
    public class HomeReasons
    {
        [Required]
        public string Id { get; set; } = "home-reasons";

        [Required]
        public string SectionTitle { get; set; } = "Why Choose DentRiz Dental Clinic in Pune";

        [Required]
        public string SectionIntro { get; set; } = "At <strong>DentRiz Dental Clinic</strong>, we believe every patient deserves a healthy, confident smile. Here's why families in Wakad, Hinjewadi, and across Pune trust us for their dental care:";

        [Required]
        public string Reason1Icon { get; set; } = "🦷";

        [Required]
        public string Reason1Title { get; set; } = "Comprehensive Dental Care for Every Smile";

        public List<string> Reason1Items { get; set; } = new List<string>
        {
            "Cosmetic dentistry including teeth whitening, veneers & smile makeovers",
            "Advanced dental implants with precision technology",
            "Family-focused care with pediatric and preventive dentistry"
        };

        [Required]
        public string Reason2Icon { get; set; } = "⚡";

        [Required]
        public string Reason2Title { get; set; } = "Modern & Advanced Dental Treatments";

        public List<string> Reason2Items { get; set; } = new List<string>
        {
            "Same-day crowns and digital dentistry for faster results",
            "Professional teeth whitening for a brighter smile",
            "Orthodontic solutions including Invisalign & invisible braces"
        };

        [Required]
        public string Reason3Icon { get; set; } = "❤️";

        [Required]
        public string Reason3Title { get; set; } = "Trusted Local Dental Clinic in Wakad & Hinjewadi";

        public List<string> Reason3Items { get; set; } = new List<string>
        {
            "Conveniently located in Wakad & Hinjewadi for easy access",
            "Flexible appointments to suit your busy schedule",
            "Affordable treatment plans with transparent pricing"
        };

        [Required]
        public string Reason4Icon { get; set; } = "🌿";

        [Required]
        public string Reason4Title { get; set; } = "Comfortable & Stress-Free Environment";

        public List<string> Reason4Items { get; set; } = new List<string>
        {
            "Pain-free dentistry options for anxious patients",
            "Warm, patient-friendly atmosphere for children & adults",
            "Multilingual staff to make every patient feel at home"
        };

        [Required]
        public string Reason5Icon { get; set; } = "🧼";

        [Required]
        public string Reason5Title { get; set; } = "Uncompromised Hygiene & Safety";

        public List<string> Reason5Items { get; set; } = new List<string>
        {
            "Strict international sterilization & infection-control protocols",
            "Clean, modern clinic with advanced dental equipment",
            "Highest standards of patient safety and comfort"
        };

        [Required]
        public string Reason6Icon { get; set; } = "💳";

        [Required]
        public string Reason6Title { get; set; } = "Accessible & Affordable Care";

        public List<string> Reason6Items { get; set; } = new List<string>
        {
            "Flexible payment plans to suit every budget",
            "Preventive care packages for families & children",
            "Transparent pricing with no hidden costs"
        };

        // Styling
        public string SectionTitleColor { get; set; } = "#2c5aa0";
        public string SectionIntroColor { get; set; } = "#333333";
        public string Reason1TitleColor { get; set; } = "#2c5aa0";
        public string Reason1ItemsColor { get; set; } = "#333333";
        public string Reason2TitleColor { get; set; } = "#2c5aa0";
        public string Reason2ItemsColor { get; set; } = "#333333";
        public string Reason3TitleColor { get; set; } = "#2c5aa0";
        public string Reason3ItemsColor { get; set; } = "#333333";
        public string Reason4TitleColor { get; set; } = "#2c5aa0";
        public string Reason4ItemsColor { get; set; } = "#333333";
        public string Reason5TitleColor { get; set; } = "#2c5aa0";
        public string Reason5ItemsColor { get; set; } = "#333333";
        public string Reason6TitleColor { get; set; } = "#2c5aa0";
        public string Reason6ItemsColor { get; set; } = "#333333";
        public string BackgroundColor { get; set; } = "rgb(255,255,255)";

        // Fonts
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SectionIntroFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason1TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason1ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason2TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason2ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason3TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason3ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason4TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason4ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason5TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason5ItemsFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason6TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string Reason6ItemsFontFamily { get; set; } = "Arial, sans-serif";
    }
}
