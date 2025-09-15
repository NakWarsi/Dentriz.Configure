using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Services
{
    public interface IHomeReasonsService
    {
        Task<HomeReasons> GetHomeReasonsAsync();
        Task<HomeReasons> CreateOrUpdateHomeReasonsAsync(HomeReasons reasons);
        Task DeleteHomeReasonsAsync(string id);
    }

    public class HomeReasonsService : IHomeReasonsService
    {
        private readonly IHomeReasonsRepository _homeReasonsRepository;

        public HomeReasonsService(IHomeReasonsRepository homeReasonsRepository)
        {
            _homeReasonsRepository = homeReasonsRepository;
        }

        public async Task<HomeReasons> GetHomeReasonsAsync()
        {
            var reasons = await _homeReasonsRepository.GetHomeReasonsAsync();
            if (reasons == null)
            {
                // Create a default document if it doesn't exist
                reasons = new HomeReasons
                {
                    Id = "home-reasons",
                    SectionTitle = "Why Choose DentRiz Dental Clinic in Pune",
                    SectionIntro = "At <strong>DentRiz Dental Clinic</strong>, we believe every patient deserves a healthy, confident smile. Here's why families in Wakad, Hinjewadi, and across Pune trust us for their dental care:",
                    Reason1Icon = "🦷",
                    Reason1Title = "Comprehensive Dental Care for Every Smile",
                    Reason1Items = new List<string>
                    {
                        "Cosmetic dentistry including teeth whitening, veneers & smile makeovers",
                        "Advanced dental implants with precision technology",
                        "Family-focused care with pediatric and preventive dentistry"
                    },
                    Reason2Icon = "⚡",
                    Reason2Title = "Modern & Advanced Dental Treatments",
                    Reason2Items = new List<string>
                    {
                        "Same-day crowns and digital dentistry for faster results",
                        "Professional teeth whitening for a brighter smile",
                        "Orthodontic solutions including Invisalign & invisible braces"
                    },
                    Reason3Icon = "❤️",
                    Reason3Title = "Trusted Local Dental Clinic in Wakad & Hinjewadi",
                    Reason3Items = new List<string>
                    {
                        "Conveniently located in Wakad & Hinjewadi for easy access",
                        "Flexible appointments to suit your busy schedule",
                        "Affordable treatment plans with transparent pricing"
                    },
                    Reason4Icon = "🌿",
                    Reason4Title = "Comfortable & Stress-Free Environment",
                    Reason4Items = new List<string>
                    {
                        "Pain-free dentistry options for anxious patients",
                        "Warm, patient-friendly atmosphere for children & adults",
                        "Multilingual staff to make every patient feel at home"
                    },
                    Reason5Icon = "🧼",
                    Reason5Title = "Uncompromised Hygiene & Safety",
                    Reason5Items = new List<string>
                    {
                        "Strict international sterilization & infection-control protocols",
                        "Clean, modern clinic with advanced dental equipment",
                        "Highest standards of patient safety and comfort"
                    },
                    Reason6Icon = "💳",
                    Reason6Title = "Accessible & Affordable Care",
                    Reason6Items = new List<string>
                    {
                        "Flexible payment plans to suit every budget",
                        "Preventive care packages for families & children",
                        "Transparent pricing with no hidden costs"
                    },
                    SectionTitleColor = "#2c5aa0",
                    SectionIntroColor = "#333333",
                    Reason1TitleColor = "#2c5aa0",
                    Reason1ItemsColor = "#333333",
                    Reason2TitleColor = "#2c5aa0",
                    Reason2ItemsColor = "#333333",
                    Reason3TitleColor = "#2c5aa0",
                    Reason3ItemsColor = "#333333",
                    Reason4TitleColor = "#2c5aa0",
                    Reason4ItemsColor = "#333333",
                    Reason5TitleColor = "#2c5aa0",
                    Reason5ItemsColor = "#333333",
                    Reason6TitleColor = "#2c5aa0",
                    Reason6ItemsColor = "#333333",
                    BackgroundColor = "rgb(255,255,255)",
                    SectionTitleFontFamily = "Arial, sans-serif",
                    SectionIntroFontFamily = "Arial, sans-serif",
                    Reason1TitleFontFamily = "Arial, sans-serif",
                    Reason1ItemsFontFamily = "Arial, sans-serif",
                    Reason2TitleFontFamily = "Arial, sans-serif",
                    Reason2ItemsFontFamily = "Arial, sans-serif",
                    Reason3TitleFontFamily = "Arial, sans-serif",
                    Reason3ItemsFontFamily = "Arial, sans-serif",
                    Reason4TitleFontFamily = "Arial, sans-serif",
                    Reason4ItemsFontFamily = "Arial, sans-serif",
                    Reason5TitleFontFamily = "Arial, sans-serif",
                    Reason5ItemsFontFamily = "Arial, sans-serif",
                    Reason6TitleFontFamily = "Arial, sans-serif",
                    Reason6ItemsFontFamily = "Arial, sans-serif"
                };
                await _homeReasonsRepository.CreateOrUpdateHomeReasonsAsync(reasons);
            }
            return reasons;
        }

        public async Task<HomeReasons> CreateOrUpdateHomeReasonsAsync(HomeReasons reasons)
        {
            reasons.Id = "home-reasons"; // Ensure consistent ID
            return await _homeReasonsRepository.CreateOrUpdateHomeReasonsAsync(reasons);
        }

        public async Task DeleteHomeReasonsAsync(string id)
        {
            await _homeReasonsRepository.DeleteHomeReasonsAsync();
        }
    }
}
