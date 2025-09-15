using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Services
{
    public interface IHomeServicesService
    {
        Task<HomeServices> GetHomeServicesAsync();
        Task<HomeServices> CreateOrUpdateHomeServicesAsync(HomeServices services);
        Task DeleteHomeServicesAsync(string id);
    }

    public class HomeServicesService : IHomeServicesService
    {
        private readonly IHomeServicesRepository _homeServicesRepository;

        public HomeServicesService(IHomeServicesRepository homeServicesRepository)
        {
            _homeServicesRepository = homeServicesRepository;
        }

        public async Task<HomeServices> GetHomeServicesAsync()
        {
            var services = await _homeServicesRepository.GetHomeServicesAsync();
            if (services == null)
            {
                // Create a default document if it doesn't exist
                services = new HomeServices
                {
                    Id = "home-services",
                    SectionTitle = "Comprehensive Dental Services in Wakad & Hinjewadi",
                    Service1Title = "🦷 Preventive Care & Dental Cleaning in Wakad",
                    Service1Items = new List<string>
                    {
                        "Professional teeth cleaning & polishing",
                        "Pediatric dentistry for children",
                        "Oral health education & cavity prevention",
                        "Family dentistry in Wakad & Hinjewadi"
                    },
                    Service1ButtonText = "Learn More",
                    Service2Title = "🔧 Restorative Care & Dental Implants in Wakad",
                    Service2Items = new List<string>
                    {
                        "Advanced dental implants in Pune",
                        "Dental crowns & bridges",
                        "Tooth-colored fillings",
                        "Emergency dental treatments"
                    },
                    Service2ButtonText = "Learn More",
                    Service3Title = "✨ Cosmetic Dentistry in Wakad",
                    Service3Items = new List<string>
                    {
                        "Teeth whitening & smile makeovers",
                        "Invisalign® & clear aligners",
                        "Dental veneers & bonding",
                        "Cosmetic contouring"
                    },
                    Service3ButtonText = "Learn More",
                    Service4Title = "😃 Orthodontics & Braces",
                    Service4Items = new List<string>
                    {
                        "Metal & ceramic braces",
                        "Invisalign® clear aligners",
                        "Early orthodontic care for children",
                        "Jaw alignment treatments"
                    },
                    Service4ButtonText = "Learn More",
                    Service5Title = "👶 Pediatric Dentistry",
                    Service5Items = new List<string>
                    {
                        "Gentle dental care for children",
                        "Preventive sealants & fluoride treatments",
                        "Habit counseling (thumb sucking, mouth breathing)",
                        "Space maintainers for growing smiles"
                    },
                    Service5ButtonText = "Learn More",
                    Service6Title = "🌿 Gum & Periodontal Care",
                    Service6Items = new List<string>
                    {
                        "Treatment for bleeding gums",
                        "Scaling & root planing",
                        "Laser gum treatments",
                        "Periodontal maintenance therapy"
                    },
                    Service6ButtonText = "Learn More",
                    Service7Title = "🔨 Oral Surgery & Extractions",
                    Service7Items = new List<string>
                    {
                        "Wisdom tooth removal",
                        "Tooth extractions with minimal pain",
                        "Minor oral surgical procedures",
                        "Bone grafting for implants"
                    },
                    Service7ButtonText = "Learn More",
                    Service8Title = "🛡️ Root Canal & Endodontics",
                    Service8Items = new List<string>
                    {
                        "Painless root canal treatment",
                        "Single-sitting RCT options",
                        "Retreatment of failed RCT",
                        "Post & core build-up"
                    },
                    Service8ButtonText = "Learn More",
                    Service9Title = "🚑 Emergency Dental Care",
                    Service9Items = new List<string>
                    {
                        "Immediate pain relief treatments",
                        "Broken tooth repair",
                        "Knocked-out tooth management",
                        "Same-day emergency appointments"
                    },
                    Service9ButtonText = "Learn More",
                    SectionTitleColor = "#2c5aa0",
                    Service1TitleColor = "#2c5aa0",
                    Service1ItemsColor = "#333333",
                    Service1ButtonColor = "#2c5aa0",
                    Service2TitleColor = "#2c5aa0",
                    Service2ItemsColor = "#333333",
                    Service2ButtonColor = "#2c5aa0",
                    Service3TitleColor = "#2c5aa0",
                    Service3ItemsColor = "#333333",
                    Service3ButtonColor = "#2c5aa0",
                    Service4TitleColor = "#2c5aa0",
                    Service4ItemsColor = "#333333",
                    Service4ButtonColor = "#2c5aa0",
                    Service5TitleColor = "#2c5aa0",
                    Service5ItemsColor = "#333333",
                    Service5ButtonColor = "#2c5aa0",
                    Service6TitleColor = "#2c5aa0",
                    Service6ItemsColor = "#333333",
                    Service6ButtonColor = "#2c5aa0",
                    Service7TitleColor = "#2c5aa0",
                    Service7ItemsColor = "#333333",
                    Service7ButtonColor = "#2c5aa0",
                    Service8TitleColor = "#2c5aa0",
                    Service8ItemsColor = "#333333",
                    Service8ButtonColor = "#2c5aa0",
                    Service9TitleColor = "#2c5aa0",
                    Service9ItemsColor = "#333333",
                    Service9ButtonColor = "#2c5aa0",
                    BackgroundColor = "rgb(255,255,255)",
                    SectionTitleFontFamily = "Arial, sans-serif",
                    Service1TitleFontFamily = "Arial, sans-serif",
                    Service1ItemsFontFamily = "Arial, sans-serif",
                    Service1ButtonFontFamily = "Arial, sans-serif",
                    Service2TitleFontFamily = "Arial, sans-serif",
                    Service2ItemsFontFamily = "Arial, sans-serif",
                    Service2ButtonFontFamily = "Arial, sans-serif",
                    Service3TitleFontFamily = "Arial, sans-serif",
                    Service3ItemsFontFamily = "Arial, sans-serif",
                    Service3ButtonFontFamily = "Arial, sans-serif",
                    Service4TitleFontFamily = "Arial, sans-serif",
                    Service4ItemsFontFamily = "Arial, sans-serif",
                    Service4ButtonFontFamily = "Arial, sans-serif",
                    Service5TitleFontFamily = "Arial, sans-serif",
                    Service5ItemsFontFamily = "Arial, sans-serif",
                    Service5ButtonFontFamily = "Arial, sans-serif",
                    Service6TitleFontFamily = "Arial, sans-serif",
                    Service6ItemsFontFamily = "Arial, sans-serif",
                    Service6ButtonFontFamily = "Arial, sans-serif",
                    Service7TitleFontFamily = "Arial, sans-serif",
                    Service7ItemsFontFamily = "Arial, sans-serif",
                    Service7ButtonFontFamily = "Arial, sans-serif",
                    Service8TitleFontFamily = "Arial, sans-serif",
                    Service8ItemsFontFamily = "Arial, sans-serif",
                    Service8ButtonFontFamily = "Arial, sans-serif",
                    Service9TitleFontFamily = "Arial, sans-serif",
                    Service9ItemsFontFamily = "Arial, sans-serif",
                    Service9ButtonFontFamily = "Arial, sans-serif"
                };
                await _homeServicesRepository.CreateOrUpdateHomeServicesAsync(services);
            }
            return services;
        }

        public async Task<HomeServices> CreateOrUpdateHomeServicesAsync(HomeServices services)
        {
            services.Id = "home-services"; // Ensure consistent ID
            return await _homeServicesRepository.CreateOrUpdateHomeServicesAsync(services);
        }

        public async Task DeleteHomeServicesAsync(string id)
        {
            await _homeServicesRepository.DeleteHomeServicesAsync();
        }
    }
}
