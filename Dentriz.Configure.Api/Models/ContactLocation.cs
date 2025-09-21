namespace Dentriz.Configure.Api.Models
{
    public class ContactLocation
    {
        public string Id { get; set; } = "contact-location";
        public string SectionTitle { get; set; } = "Find Our Office";
        public string SectionDescription { get; set; } = "Our dental office is conveniently located in the heart of the city, with easy access to public transportation and plenty of parking available. We're committed to making your visit as comfortable and convenient as possible.";
        public string AddressTitle { get; set; } = "📍 Address:";
        public string AddressContent { get; set; } = "Dentriz Dental Clinic<br>Rohan Tarang, Wakad Chowk<br>opposit Alamgir masjid";
        public string ParkingTitle { get; set; } = "🚗 Parking:";
        public string ParkingContent { get; set; } = "Free parking available in our lot";
        public string TransitTitle { get; set; } = "🚌 Public Transit:";
        public string TransitContent { get; set; } = "Bus routes available to stop nearby<br>wakd chowk bus stop";
        public string MetroTitle { get; set; } = "♿ Metro Stop:";
        public string MetroContent { get; set; } = "walking distanbce from Hinjewadi bridge(metro station)";
        public string MapTitle { get; set; } = "📍 Visit Our Clinic";
        public string MapEmbedUrl { get; set; } = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d236.35202385690053!2d73.76117365276494!3d18.59060519688083!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b97dc645a90f%3A0xf370478ecff49ae9!2sDentriz%20dental%20clinic!5e0!3m2!1sen!2sin!4v1755898762059!5m2!1sen!2sin";
        public string MapLocation { get; set; } = "📍 Location: Wakad, Pune, Maharashtra";
        public string MapHours { get; set; } = "🕒 Hours: Mon-Sun: 9:00 AM - 10:00 PM";
        public string DirectionsLink { get; set; } = "https://maps.app.goo.gl/qJdrWXYGJR8ki7BR7";
        public string DirectionsText { get; set; } = "📍 Get Directions";
        public string SectionTitleColor { get; set; } = "#2c5aa0";
        public string SectionDescriptionColor { get; set; } = "#666666";
        public string DetailTitleColor { get; set; } = "#2c5aa0";
        public string DetailContentColor { get; set; } = "#333333";
        public string MapTitleColor { get; set; } = "#2c5aa0";
        public string MapInfoColor { get; set; } = "#333333";
        public string MapLinkColor { get; set; } = "#007bff";
        public string BackgroundColor { get; set; } = "#f8f9fa";
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SectionDescriptionFontFamily { get; set; } = "Arial, sans-serif";
        public string DetailTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string DetailContentFontFamily { get; set; } = "Arial, sans-serif";
        public string MapTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string MapInfoFontFamily { get; set; } = "Arial, sans-serif";
        public string MapLinkFontFamily { get; set; } = "Arial, sans-serif";
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string Version { get; set; } = "1.0";
    }
}
