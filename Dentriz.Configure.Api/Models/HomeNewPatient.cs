using System.ComponentModel.DataAnnotations;

namespace Dentriz.Configure.Api.Models
{
    public class HomeNewPatient
    {
        [Required]
        public string Id { get; set; } = "home-new-patient";

        [Required]
        public string MainTitle { get; set; } = "Clinic Accessibility & Nearby Convenience";

        [Required]
        public string AddressTitle { get; set; } = "📍 Address";

        [Required]
        public string AddressContent { get; set; } = "Dentriz Dental Clinic <br>Rohan Tarang, Wakad Chowk <br>Opposite Alamgir Masjid <br><em>Landmark:</em> Close to Mahavir Medical & Hinjewadi Bridge";

        [Required]
        public string ParkingTitle { get; set; } = "🚗 Parking";

        [Required]
        public string ParkingContent { get; set; } = "Free parking available within our premises, with easy access for both two-wheelers and four-wheelers.";

        [Required]
        public string TransitTitle { get; set; } = "🚌 Public Transit";

        [Required]
        public string TransitContent { get; set; } = "Connected by multiple city bus routes, with Wakad Chowk Bus Stop just a few steps away.";

        [Required]
        public string MetroTitle { get; set; } = "♿ Metro Access";

        [Required]
        public string MetroContent { get; set; } = "Walking distance from Hinjewadi Bridge Metro Station, making it simple for daily commuters.";

        [Required]
        public string AccessibilityTitle { get; set; } = "👨‍👩‍👧‍👦 Accessibility";

        [Required]
        public string AccessibilityContent { get; set; } = "Our clinic is designed to be family-friendly and wheelchair accessible, with a clean waiting area for kids and seniors.";

        [Required]
        public string HoursTitle { get; set; } = "⏰ Flexible Hours";

        [Required]
        public string HoursContent { get; set; } = "Open late till 10:00 PM mon to sat, so you can schedule visits after office or school hours or on weekends.";

        [Required]
        public string SafetyTitle { get; set; } = "🛡️ Comfort & Safety";

        [Required]
        public string SafetyContent { get; set; } = "A modern, hygienic setup equipped with advanced technology, ensuring a stress-free and safe dental experience.";

        [Required]
        public string ButtonText { get; set; } = "Book Your Appointment";

        [Required]
        public string MapTitle { get; set; } = "📍 Visit Our Clinic";

        [Required]
        public string LocationText { get; set; } = "📍 Location: Wakad, Pune, Maharashtra";

        [Required]
        public string HoursText { get; set; } = "🕒 Hours: Mon-Sat: 9:00 AM - 10:00 PM";

        [Required]
        public string DirectionsText { get; set; } = "📍 Get Directions";

        // Styling
        public string MainTitleColor { get; set; } = "#2c5aa0";
        public string AddressTitleColor { get; set; } = "#2c5aa0";
        public string AddressContentColor { get; set; } = "#333333";
        public string ParkingTitleColor { get; set; } = "#2c5aa0";
        public string ParkingContentColor { get; set; } = "#333333";
        public string TransitTitleColor { get; set; } = "#2c5aa0";
        public string TransitContentColor { get; set; } = "#333333";
        public string MetroTitleColor { get; set; } = "#2c5aa0";
        public string MetroContentColor { get; set; } = "#333333";
        public string AccessibilityTitleColor { get; set; } = "#2c5aa0";
        public string AccessibilityContentColor { get; set; } = "#333333";
        public string HoursTitleColor { get; set; } = "#2c5aa0";
        public string HoursContentColor { get; set; } = "#333333";
        public string SafetyTitleColor { get; set; } = "#2c5aa0";
        public string SafetyContentColor { get; set; } = "#333333";
        public string ButtonTextColor { get; set; } = "#ffffff";
        public string MapTitleColor { get; set; } = "#2c5aa0";
        public string LocationTextColor { get; set; } = "#333333";
        public string HoursTextColor { get; set; } = "#333333";
        public string DirectionsTextColor { get; set; } = "#2c5aa0";
        public string BackgroundColor { get; set; } = "rgb(248,249,250)";

        // Fonts
        public string MainTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string AddressTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string AddressContentFontFamily { get; set; } = "Arial, sans-serif";
        public string ParkingTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string ParkingContentFontFamily { get; set; } = "Arial, sans-serif";
        public string TransitTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string TransitContentFontFamily { get; set; } = "Arial, sans-serif";
        public string MetroTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string MetroContentFontFamily { get; set; } = "Arial, sans-serif";
        public string AccessibilityTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string AccessibilityContentFontFamily { get; set; } = "Arial, sans-serif";
        public string HoursTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string HoursContentFontFamily { get; set; } = "Arial, sans-serif";
        public string SafetyTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SafetyContentFontFamily { get; set; } = "Arial, sans-serif";
        public string ButtonTextFontFamily { get; set; } = "Arial, sans-serif";
        public string MapTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string LocationTextFontFamily { get; set; } = "Arial, sans-serif";
        public string HoursTextFontFamily { get; set; } = "Arial, sans-serif";
        public string DirectionsTextFontFamily { get; set; } = "Arial, sans-serif";
    }
}
