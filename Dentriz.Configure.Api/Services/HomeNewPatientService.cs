using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Services
{
    public interface IHomeNewPatientService
    {
        Task<HomeNewPatient> GetHomeNewPatientAsync();
        Task<HomeNewPatient> CreateOrUpdateHomeNewPatientAsync(HomeNewPatient newPatient);
        Task DeleteHomeNewPatientAsync(string id);
    }

    public class HomeNewPatientService : IHomeNewPatientService
    {
        private readonly IHomeNewPatientRepository _homeNewPatientRepository;

        public HomeNewPatientService(IHomeNewPatientRepository homeNewPatientRepository)
        {
            _homeNewPatientRepository = homeNewPatientRepository;
        }

        public async Task<HomeNewPatient> GetHomeNewPatientAsync()
        {
            var newPatient = await _homeNewPatientRepository.GetHomeNewPatientAsync();
            if (newPatient == null)
            {
                // Create a default document if it doesn't exist
                newPatient = new HomeNewPatient
                {
                    Id = "home-new-patient",
                    MainTitle = "Clinic Accessibility & Nearby Convenience",
                    AddressTitle = "📍 Address",
                    AddressContent = "Dentriz Dental Clinic <br>Rohan Tarang, Wakad Chowk <br>Opposite Alamgir Masjid <br><em>Landmark:</em> Close to Mahavir Medical & Hinjewadi Bridge",
                    ParkingTitle = "🚗 Parking",
                    ParkingContent = "Free parking available within our premises, with easy access for both two-wheelers and four-wheelers.",
                    TransitTitle = "🚌 Public Transit",
                    TransitContent = "Connected by multiple city bus routes, with Wakad Chowk Bus Stop just a few steps away.",
                    MetroTitle = "♿ Metro Access",
                    MetroContent = "Walking distance from Hinjewadi Bridge Metro Station, making it simple for daily commuters.",
                    AccessibilityTitle = "👨‍👩‍👧‍👦 Accessibility",
                    AccessibilityContent = "Our clinic is designed to be family-friendly and wheelchair accessible, with a clean waiting area for kids and seniors.",
                    HoursTitle = "⏰ Flexible Hours",
                    HoursContent = "Open late till 10:00 PM mon to sat, so you can schedule visits after office or school hours or on weekends.",
                    SafetyTitle = "🛡️ Comfort & Safety",
                    SafetyContent = "A modern, hygienic setup equipped with advanced technology, ensuring a stress-free and safe dental experience.",
                    ButtonText = "Book Your Appointment",
                    MapTitle = "📍 Visit Our Clinic",
                    LocationText = "📍 Location: Wakad, Pune, Maharashtra",
                    HoursText = "🕒 Hours: Mon-Sat: 9:00 AM - 10:00 PM",
                    DirectionsText = "📍 Get Directions",
                    MainTitleColor = "#2c5aa0",
                    AddressTitleColor = "#2c5aa0",
                    AddressContentColor = "#333333",
                    ParkingTitleColor = "#2c5aa0",
                    ParkingContentColor = "#333333",
                    TransitTitleColor = "#2c5aa0",
                    TransitContentColor = "#333333",
                    MetroTitleColor = "#2c5aa0",
                    MetroContentColor = "#333333",
                    AccessibilityTitleColor = "#2c5aa0",
                    AccessibilityContentColor = "#333333",
                    HoursTitleColor = "#2c5aa0",
                    HoursContentColor = "#333333",
                    SafetyTitleColor = "#2c5aa0",
                    SafetyContentColor = "#333333",
                    ButtonTextColor = "#ffffff",
                    MapTitleColor = "#2c5aa0",
                    LocationTextColor = "#333333",
                    HoursTextColor = "#333333",
                    DirectionsTextColor = "#2c5aa0",
                    BackgroundColor = "rgb(248,249,250)",
                    MainTitleFontFamily = "Arial, sans-serif",
                    AddressTitleFontFamily = "Arial, sans-serif",
                    AddressContentFontFamily = "Arial, sans-serif",
                    ParkingTitleFontFamily = "Arial, sans-serif",
                    ParkingContentFontFamily = "Arial, sans-serif",
                    TransitTitleFontFamily = "Arial, sans-serif",
                    TransitContentFontFamily = "Arial, sans-serif",
                    MetroTitleFontFamily = "Arial, sans-serif",
                    MetroContentFontFamily = "Arial, sans-serif",
                    AccessibilityTitleFontFamily = "Arial, sans-serif",
                    AccessibilityContentFontFamily = "Arial, sans-serif",
                    HoursTitleFontFamily = "Arial, sans-serif",
                    HoursContentFontFamily = "Arial, sans-serif",
                    SafetyTitleFontFamily = "Arial, sans-serif",
                    SafetyContentFontFamily = "Arial, sans-serif",
                    ButtonTextFontFamily = "Arial, sans-serif",
                    MapTitleFontFamily = "Arial, sans-serif",
                    LocationTextFontFamily = "Arial, sans-serif",
                    HoursTextFontFamily = "Arial, sans-serif",
                    DirectionsTextFontFamily = "Arial, sans-serif"
                };
                await _homeNewPatientRepository.CreateOrUpdateHomeNewPatientAsync(newPatient);
            }
            return newPatient;
        }

        public async Task<HomeNewPatient> CreateOrUpdateHomeNewPatientAsync(HomeNewPatient newPatient)
        {
            newPatient.Id = "home-new-patient"; // Ensure consistent ID
            return await _homeNewPatientRepository.CreateOrUpdateHomeNewPatientAsync(newPatient);
        }

        public async Task DeleteHomeNewPatientAsync(string id)
        {
            await _homeNewPatientRepository.DeleteHomeNewPatientAsync();
        }
    }
}
