using Dentriz.Configure.Api.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IHomeNewPatientRepository
    {
        Task<HomeNewPatient?> GetHomeNewPatientAsync();
        Task<HomeNewPatient> CreateOrUpdateHomeNewPatientAsync(HomeNewPatient newPatient);
        Task<bool> DeleteHomeNewPatientAsync();
    }

    public class HomeNewPatientRepository : BaseRepository<dynamic>, IHomeNewPatientRepository
    {
        private const string DOCUMENT_ID = "home-new-patient";
        private const string PARTITION_KEY = "home-new-patient";

        public HomeNewPatientRepository(Container container, ILogger<HomeNewPatientRepository> logger)
            : base(container, logger)
        {
        }

        public async Task<HomeNewPatient?> GetHomeNewPatientAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new HomeNewPatient
                {
                    Id = doc.id ?? DOCUMENT_ID,
                    MainTitle = doc.mainTitle ?? "Clinic Accessibility & Nearby Convenience",
                    AddressTitle = doc.addressTitle ?? "📍 Address",
                    AddressContent = doc.addressContent ?? "Dentriz Dental Clinic <br>Rohan Tarang, Wakad Chowk <br>Opposite Alamgir Masjid <br><em>Landmark:</em> Close to Mahavir Medical & Hinjewadi Bridge",
                    ParkingTitle = doc.parkingTitle ?? "🚗 Parking",
                    ParkingContent = doc.parkingContent ?? "Free parking available within our premises, with easy access for both two-wheelers and four-wheelers.",
                    TransitTitle = doc.transitTitle ?? "🚌 Public Transit",
                    TransitContent = doc.transitContent ?? "Connected by multiple city bus routes, with Wakad Chowk Bus Stop just a few steps away.",
                    MetroTitle = doc.metroTitle ?? "♿ Metro Access",
                    MetroContent = doc.metroContent ?? "Walking distance from Hinjewadi Bridge Metro Station, making it simple for daily commuters.",
                    AccessibilityTitle = doc.accessibilityTitle ?? "👨‍👩‍👧‍👦 Accessibility",
                    AccessibilityContent = doc.accessibilityContent ?? "Our clinic is designed to be family-friendly and wheelchair accessible, with a clean waiting area for kids and seniors.",
                    HoursTitle = doc.hoursTitle ?? "⏰ Flexible Hours",
                    HoursContent = doc.hoursContent ?? "Open late till 10:00 PM mon to sat, so you can schedule visits after office or school hours or on weekends.",
                    SafetyTitle = doc.safetyTitle ?? "🛡️ Comfort & Safety",
                    SafetyContent = doc.safetyContent ?? "A modern, hygienic setup equipped with advanced technology, ensuring a stress-free and safe dental experience.",
                    ButtonText = doc.buttonText ?? "Book Your Appointment",
                    MapTitle = doc.mapTitle ?? "📍 Visit Our Clinic",
                    LocationText = doc.locationText ?? "📍 Location: Wakad, Pune, Maharashtra",
                    HoursText = doc.hoursText ?? "🕒 Hours: Mon-Sat: 9:00 AM - 10:00 PM",
                    DirectionsText = doc.directionsText ?? "📍 Get Directions",
                    MainTitleColor = doc.mainTitleColor ?? "#2c5aa0",
                    AddressTitleColor = doc.addressTitleColor ?? "#2c5aa0",
                    AddressContentColor = doc.addressContentColor ?? "#333333",
                    ParkingTitleColor = doc.parkingTitleColor ?? "#2c5aa0",
                    ParkingContentColor = doc.parkingContentColor ?? "#333333",
                    TransitTitleColor = doc.transitTitleColor ?? "#2c5aa0",
                    TransitContentColor = doc.transitContentColor ?? "#333333",
                    MetroTitleColor = doc.metroTitleColor ?? "#2c5aa0",
                    MetroContentColor = doc.metroContentColor ?? "#333333",
                    AccessibilityTitleColor = doc.accessibilityTitleColor ?? "#2c5aa0",
                    AccessibilityContentColor = doc.accessibilityContentColor ?? "#333333",
                    HoursTitleColor = doc.hoursTitleColor ?? "#2c5aa0",
                    HoursContentColor = doc.hoursContentColor ?? "#333333",
                    SafetyTitleColor = doc.safetyTitleColor ?? "#2c5aa0",
                    SafetyContentColor = doc.safetyContentColor ?? "#333333",
                    ButtonTextColor = doc.buttonTextColor ?? "#ffffff",
                    MapTitleColor = doc.mapTitleColor ?? "#2c5aa0",
                    LocationTextColor = doc.locationTextColor ?? "#333333",
                    HoursTextColor = doc.hoursTextColor ?? "#333333",
                    DirectionsTextColor = doc.directionsTextColor ?? "#2c5aa0",
                    BackgroundColor = doc.backgroundColor ?? "rgb(248,249,250)",
                    MainTitleFontFamily = doc.mainTitleFontFamily ?? "Arial, sans-serif",
                    AddressTitleFontFamily = doc.addressTitleFontFamily ?? "Arial, sans-serif",
                    AddressContentFontFamily = doc.addressContentFontFamily ?? "Arial, sans-serif",
                    ParkingTitleFontFamily = doc.parkingTitleFontFamily ?? "Arial, sans-serif",
                    ParkingContentFontFamily = doc.parkingContentFontFamily ?? "Arial, sans-serif",
                    TransitTitleFontFamily = doc.transitTitleFontFamily ?? "Arial, sans-serif",
                    TransitContentFontFamily = doc.transitContentFontFamily ?? "Arial, sans-serif",
                    MetroTitleFontFamily = doc.metroTitleFontFamily ?? "Arial, sans-serif",
                    MetroContentFontFamily = doc.metroContentFontFamily ?? "Arial, sans-serif",
                    AccessibilityTitleFontFamily = doc.accessibilityTitleFontFamily ?? "Arial, sans-serif",
                    AccessibilityContentFontFamily = doc.accessibilityContentFontFamily ?? "Arial, sans-serif",
                    HoursTitleFontFamily = doc.hoursTitleFontFamily ?? "Arial, sans-serif",
                    HoursContentFontFamily = doc.hoursContentFontFamily ?? "Arial, sans-serif",
                    SafetyTitleFontFamily = doc.safetyTitleFontFamily ?? "Arial, sans-serif",
                    SafetyContentFontFamily = doc.safetyContentFontFamily ?? "Arial, sans-serif",
                    ButtonTextFontFamily = doc.buttonTextFontFamily ?? "Arial, sans-serif",
                    MapTitleFontFamily = doc.mapTitleFontFamily ?? "Arial, sans-serif",
                    LocationTextFontFamily = doc.locationTextFontFamily ?? "Arial, sans-serif",
                    HoursTextFontFamily = doc.hoursTextFontFamily ?? "Arial, sans-serif",
                    DirectionsTextFontFamily = doc.directionsTextFontFamily ?? "Arial, sans-serif"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving home new patient config from repository");
                throw;
            }
        }

        public async Task<HomeNewPatient> CreateOrUpdateHomeNewPatientAsync(HomeNewPatient newPatient)
        {
            try
            {
                newPatient.Id = DOCUMENT_ID;

                var document = new
                {
                    id = newPatient.Id,
                    mainTitle = newPatient.MainTitle,
                    addressTitle = newPatient.AddressTitle,
                    addressContent = newPatient.AddressContent,
                    parkingTitle = newPatient.ParkingTitle,
                    parkingContent = newPatient.ParkingContent,
                    transitTitle = newPatient.TransitTitle,
                    transitContent = newPatient.TransitContent,
                    metroTitle = newPatient.MetroTitle,
                    metroContent = newPatient.MetroContent,
                    accessibilityTitle = newPatient.AccessibilityTitle,
                    accessibilityContent = newPatient.AccessibilityContent,
                    hoursTitle = newPatient.HoursTitle,
                    hoursContent = newPatient.HoursContent,
                    safetyTitle = newPatient.SafetyTitle,
                    safetyContent = newPatient.SafetyContent,
                    buttonText = newPatient.ButtonText,
                    mapTitle = newPatient.MapTitle,
                    locationText = newPatient.LocationText,
                    hoursText = newPatient.HoursText,
                    directionsText = newPatient.DirectionsText,
                    mainTitleColor = newPatient.MainTitleColor,
                    addressTitleColor = newPatient.AddressTitleColor,
                    addressContentColor = newPatient.AddressContentColor,
                    parkingTitleColor = newPatient.ParkingTitleColor,
                    parkingContentColor = newPatient.ParkingContentColor,
                    transitTitleColor = newPatient.TransitTitleColor,
                    transitContentColor = newPatient.TransitContentColor,
                    metroTitleColor = newPatient.MetroTitleColor,
                    metroContentColor = newPatient.MetroContentColor,
                    accessibilityTitleColor = newPatient.AccessibilityTitleColor,
                    accessibilityContentColor = newPatient.AccessibilityContentColor,
                    hoursTitleColor = newPatient.HoursTitleColor,
                    hoursContentColor = newPatient.HoursContentColor,
                    safetyTitleColor = newPatient.SafetyTitleColor,
                    safetyContentColor = newPatient.SafetyContentColor,
                    buttonTextColor = newPatient.ButtonTextColor,
                    mapTitleColor = newPatient.MapTitleColor,
                    locationTextColor = newPatient.LocationTextColor,
                    hoursTextColor = newPatient.HoursTextColor,
                    directionsTextColor = newPatient.DirectionsTextColor,
                    backgroundColor = newPatient.BackgroundColor,
                    mainTitleFontFamily = newPatient.MainTitleFontFamily,
                    addressTitleFontFamily = newPatient.AddressTitleFontFamily,
                    addressContentFontFamily = newPatient.AddressContentFontFamily,
                    parkingTitleFontFamily = newPatient.ParkingTitleFontFamily,
                    parkingContentFontFamily = newPatient.ParkingContentFontFamily,
                    transitTitleFontFamily = newPatient.TransitTitleFontFamily,
                    transitContentFontFamily = newPatient.TransitContentFontFamily,
                    metroTitleFontFamily = newPatient.MetroTitleFontFamily,
                    metroContentFontFamily = newPatient.MetroContentFontFamily,
                    accessibilityTitleFontFamily = newPatient.AccessibilityTitleFontFamily,
                    accessibilityContentFontFamily = newPatient.AccessibilityContentFontFamily,
                    hoursTitleFontFamily = newPatient.HoursTitleFontFamily,
                    hoursContentFontFamily = newPatient.HoursContentFontFamily,
                    safetyTitleFontFamily = newPatient.SafetyTitleFontFamily,
                    safetyContentFontFamily = newPatient.SafetyContentFontFamily,
                    buttonTextFontFamily = newPatient.ButtonTextFontFamily,
                    mapTitleFontFamily = newPatient.MapTitleFontFamily,
                    locationTextFontFamily = newPatient.LocationTextFontFamily,
                    hoursTextFontFamily = newPatient.HoursTextFontFamily,
                    directionsTextFontFamily = newPatient.DirectionsTextFontFamily
                };

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
                return newPatient;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving home new patient config to repository");
                throw;
            }
        }

        public async Task<bool> DeleteHomeNewPatientAsync()
        {
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }
    }
}
