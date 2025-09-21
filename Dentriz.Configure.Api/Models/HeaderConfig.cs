using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Dentriz.Configure.Api.Models
{
    public class HeaderConfig
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = "header-config";

        // Header Logo Section
        [Required]
        [JsonPropertyName("logoAlt")]
        public string LogoAlt { get; set; } = "DentRiz Dental Clinic Logo";

        [Required]
        [JsonPropertyName("logoImage")]
        public string LogoImage { get; set; } = "/images/clinic/logo.png";

        [Required]
        [JsonPropertyName("clinicName")]
        public string ClinicName { get; set; } = "DentRiz Dental Clinic";

        [Required]
        [JsonPropertyName("tagline")]
        public string Tagline { get; set; } = "Multi Speciality Dental Clinic & Implant Center";

        // Navigation Items
        [JsonPropertyName("navItems")]
        public List<NavItem> NavItems { get; set; } = new List<NavItem>
        {
            new NavItem { Label = "Home", Route = "/", Exact = true },
            new NavItem { Label = "Services", Route = "/services", Exact = false },
            new NavItem { Label = "About Us", Route = "/about", Exact = false },
            new NavItem { Label = "Our Smiles", Route = "/smile-gallery", Exact = false },
            new NavItem { Label = "Contact", Route = "/contact", Exact = false }
        };

        // Styling Colors
        [JsonPropertyName("backgroundColor")]
        public string BackgroundColor { get; set; } = "#ffffff";

        [JsonPropertyName("textColor")]
        public string TextColor { get; set; } = "#1e3c72";

        [JsonPropertyName("logoTextColor")]
        public string LogoTextColor { get; set; } = "#1e3c72";

        [JsonPropertyName("taglineColor")]
        public string TaglineColor { get; set; } = "#666666";

        [JsonPropertyName("navLinkColor")]
        public string NavLinkColor { get; set; } = "#1e3c72";

        [JsonPropertyName("navLinkHoverColor")]
        public string NavLinkHoverColor { get; set; } = "#2c5aa0";

        [JsonPropertyName("navLinkActiveColor")]
        public string NavLinkActiveColor { get; set; } = "#2c5aa0";

        [JsonPropertyName("mobileMenuBgColor")]
        public string MobileMenuBgColor { get; set; } = "#ffffff";

        [JsonPropertyName("mobileMenuTextColor")]
        public string MobileMenuTextColor { get; set; } = "#1e3c72";

        // Font Families
        [JsonPropertyName("clinicNameFontFamily")]
        public string ClinicNameFontFamily { get; set; } = "Arial, sans-serif";

        [JsonPropertyName("taglineFontFamily")]
        public string TaglineFontFamily { get; set; } = "Arial, sans-serif";

        [JsonPropertyName("navLinkFontFamily")]
        public string NavLinkFontFamily { get; set; } = "Arial, sans-serif";

        // Metadata
        [JsonPropertyName("lastUpdated")]
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("version")]
        public string Version { get; set; } = "1.0";
    }

    public class NavItem
    {
        [Required]
        [JsonPropertyName("label")]
        public string Label { get; set; } = string.Empty;

        [Required]
        [JsonPropertyName("route")]
        public string Route { get; set; } = string.Empty;

        [JsonPropertyName("exact")]
        public bool Exact { get; set; } = false;
    }

    public class HeaderConfigRequest
    {
        [JsonPropertyName("logoAlt")]
        public string? LogoAlt { get; set; }

        [JsonPropertyName("logoImage")]
        public string? LogoImage { get; set; }

        [JsonPropertyName("clinicName")]
        public string? ClinicName { get; set; }

        [JsonPropertyName("tagline")]
        public string? Tagline { get; set; }

        [JsonPropertyName("navItems")]
        public List<NavItem>? NavItems { get; set; }

        [JsonPropertyName("backgroundColor")]
        public string? BackgroundColor { get; set; }

        [JsonPropertyName("textColor")]
        public string? TextColor { get; set; }

        [JsonPropertyName("logoTextColor")]
        public string? LogoTextColor { get; set; }

        [JsonPropertyName("taglineColor")]
        public string? TaglineColor { get; set; }

        [JsonPropertyName("navLinkColor")]
        public string? NavLinkColor { get; set; }

        [JsonPropertyName("navLinkHoverColor")]
        public string? NavLinkHoverColor { get; set; }

        [JsonPropertyName("navLinkActiveColor")]
        public string? NavLinkActiveColor { get; set; }

        [JsonPropertyName("mobileMenuBgColor")]
        public string? MobileMenuBgColor { get; set; }

        [JsonPropertyName("mobileMenuTextColor")]
        public string? MobileMenuTextColor { get; set; }

        [JsonPropertyName("clinicNameFontFamily")]
        public string? ClinicNameFontFamily { get; set; }

        [JsonPropertyName("taglineFontFamily")]
        public string? TaglineFontFamily { get; set; }

        [JsonPropertyName("navLinkFontFamily")]
        public string? NavLinkFontFamily { get; set; }
    }
}
