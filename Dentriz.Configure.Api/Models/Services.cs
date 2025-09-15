using System.ComponentModel.DataAnnotations;

namespace Dentriz.Configure.Api.Models
{
    public class ServiceItem
    {
        public string Icon { get; set; } = "";
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public List<string> Features { get; set; } = new List<string>();
    }

    public class Service
    {
        public string SectionTitle { get; set; } = "";
        public string SectionSubtitle { get; set; } = "";
        public string SectionIcon { get; set; } = "";
        public List<ServiceItem> Services { get; set; } = new List<ServiceItem>();
        
        // Styling
        public string SectionTitleColor { get; set; } = "#1e3c72";
        public string SectionSubtitleColor { get; set; } = "#666666";
        public string BackgroundColor { get; set; } = "#ffffff";
        public string CardTitleColor { get; set; } = "#1e3c72";
        public string CardDescriptionColor { get; set; } = "#666666";
        public string CardFeaturesColor { get; set; } = "#333333";
        
        // Fonts
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SectionSubtitleFontFamily { get; set; } = "Arial, sans-serif";
        public string CardTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string CardDescriptionFontFamily { get; set; } = "Arial, sans-serif";
        public string CardFeaturesFontFamily { get; set; } = "Arial, sans-serif";
    }

    public class ServicesConfig
    {
        [Required]
        public string Id { get; set; } = "services";

        public List<Service> ServiceList { get; set; } = new List<Service>
        {
            // Restorative Care
            new Service
            {
                SectionTitle = "Restorative Care",
                SectionSubtitle = "Restoring function and beauty to your smile",
                SectionIcon = "🔧",
                Services = new List<ServiceItem>
                {
                    new ServiceItem
                    {
                        Icon = "⚡",
                        Title = "Same-Day Emergencies",
                        Description = "Dental emergencies don't wait, and neither should you. We provide prompt emergency care to relieve pain and address urgent dental issues.",
                        Features = new List<string> { "Toothache relief", "Broken tooth repair", "Lost filling replacement", "Emergency extractions" }
                    },
                    new ServiceItem
                    {
                        Icon = "🦷",
                        Title = "Composite Fillings",
                        Description = "Modern tooth-colored fillings that blend seamlessly with your natural teeth while providing strong, durable restoration.",
                        Features = new List<string> { "Natural appearance", "Bonded to tooth structure", "Minimal tooth preparation", "Long-lasting results" }
                    },
                    new ServiceItem
                    {
                        Icon = "👑",
                        Title = "Crowns & Bridges",
                        Description = "Restore damaged or missing teeth with custom-made crowns and bridges that look and function like natural teeth.",
                        Features = new List<string> { "Same-day CEREC crowns", "Traditional porcelain crowns", "Fixed bridges", "Implant-supported crowns" }
                    },
                    new ServiceItem
                    {
                        Icon = "🦷",
                        Title = "Dental Implants",
                        Description = "The gold standard for replacing missing teeth, dental implants provide a permanent solution that looks, feels, and functions like natural teeth.",
                        Features = new List<string> { "Single tooth replacement", "Multiple tooth replacement", "Full arch restoration", "Implant-supported dentures" }
                    }
                },
                SectionTitleColor = "#1e3c72",
                SectionSubtitleColor = "#666666",
                BackgroundColor = "#ffffff",
                CardTitleColor = "#1e3c72",
                CardDescriptionColor = "#666666",
                CardFeaturesColor = "#333333",
                SectionTitleFontFamily = "Arial, sans-serif",
                SectionSubtitleFontFamily = "Arial, sans-serif",
                CardTitleFontFamily = "Arial, sans-serif",
                CardDescriptionFontFamily = "Arial, sans-serif",
                CardFeaturesFontFamily = "Arial, sans-serif"
            },
            
            // Preventive Care
            new Service
            {
                SectionTitle = "Preventive Care",
                SectionSubtitle = "Keeping your smile healthy starts with prevention",
                SectionIcon = "🦷",
                Services = new List<ServiceItem>
                {
                    new ServiceItem
                    {
                        Icon = "🦷",
                        Title = "Routine Checkups & Cleanings",
                        Description = "Regular dental checkups and professional cleanings are the foundation of good oral health. We recommend visits every 6 months to catch issues early and keep your smile bright.",
                        Features = new List<string> { "Comprehensive oral examination", "Professional teeth cleaning", "Digital X-rays when needed", "Oral cancer screening" }
                    },
                    new ServiceItem
                    {
                        Icon = "👨‍👩‍👧‍👦",
                        Title = "Family & Children's Dental Services",
                        Description = "We welcome patients of all ages and provide gentle, age-appropriate care for children to help them develop positive dental habits for life.",
                        Features = new List<string> { "Child-friendly environment", "Early cavity detection", "Dental sealants", "Fluoride treatments" }
                    },
                    new ServiceItem
                    {
                        Icon = "📚",
                        Title = "Oral Health Education",
                        Description = "We believe in empowering our patients with knowledge about proper oral hygiene and dental care practices.",
                        Features = new List<string> { "Brushing and flossing techniques", "Nutrition guidance", "Preventive care tips", "Lifestyle recommendations" }
                    }
                },
                SectionTitleColor = "#1e3c72",
                SectionSubtitleColor = "#666666",
                BackgroundColor = "#ffffff",
                CardTitleColor = "#1e3c72",
                CardDescriptionColor = "#666666",
                CardFeaturesColor = "#333333",
                SectionTitleFontFamily = "Arial, sans-serif",
                SectionSubtitleFontFamily = "Arial, sans-serif",
                CardTitleFontFamily = "Arial, sans-serif",
                CardDescriptionFontFamily = "Arial, sans-serif",
                CardFeaturesFontFamily = "Arial, sans-serif"
            },
            
            // Cosmetic Services
            new Service
            {
                SectionTitle = "Cosmetic Services",
                SectionSubtitle = "Enhancing the beauty of your smile",
                SectionIcon = "✨",
                Services = new List<ServiceItem>
                {
                    new ServiceItem
                    {
                        Icon = "🦷",
                        Title = "Dental Bonding",
                        Description = "A quick and cost-effective way to improve the appearance of chipped, cracked, or discolored teeth.",
                        Features = new List<string> { "Repair chipped teeth", "Close gaps between teeth", "Improve tooth shape", "Single visit treatment" }
                    },
                    new ServiceItem
                    {
                        Icon = "😁",
                        Title = "Teeth Whitening",
                        Description = "Professional teeth whitening services to brighten your smile and boost your confidence.",
                        Features = new List<string> { "In-office whitening", "Take-home whitening kits", "Custom-fitted trays", "Long-lasting results" }
                    },
                    new ServiceItem
                    {
                        Icon = "🦷",
                        Title = "Invisalign®",
                        Description = "Straighten your teeth discreetly with clear, removable aligners that fit your lifestyle.",
                        Features = new List<string> { "Virtually invisible", "Removable aligners", "Comfortable treatment", "Digital treatment planning" }
                    },
                    new ServiceItem
                    {
                        Icon = "✨",
                        Title = "Dental Veneers",
                        Description = "Transform your smile with custom-made porcelain veneers that create a beautiful, natural-looking appearance.",
                        Features = new List<string> { "Same-day veneers available", "Stain-resistant", "Natural appearance", "Long-lasting results" }
                    }
                },
                SectionTitleColor = "#1e3c72",
                SectionSubtitleColor = "#666666",
                BackgroundColor = "#ffffff",
                CardTitleColor = "#1e3c72",
                CardDescriptionColor = "#666666",
                CardFeaturesColor = "#333333",
                SectionTitleFontFamily = "Arial, sans-serif",
                SectionSubtitleFontFamily = "Arial, sans-serif",
                CardTitleFontFamily = "Arial, sans-serif",
                CardDescriptionFontFamily = "Arial, sans-serif",
                CardFeaturesFontFamily = "Arial, sans-serif"
            }
        };
    }
}
