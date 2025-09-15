using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Services
{
    public interface IHomeFounderService
    {
        Task<HomeFounder> GetHomeFounderAsync();
        Task<HomeFounder> CreateOrUpdateHomeFounderAsync(HomeFounder founder);
        Task DeleteHomeFounderAsync(string id);
    }

    public class HomeFounderService : IHomeFounderService
    {
        private readonly IHomeFounderRepository _homeFounderRepository;

        public HomeFounderService(IHomeFounderRepository homeFounderRepository)
        {
            _homeFounderRepository = homeFounderRepository;
        }

        public async Task<HomeFounder> GetHomeFounderAsync()
        {
            var founder = await _homeFounderRepository.GetHomeFounderAsync();
            if (founder == null)
            {
                // Create a default document if it doesn't exist
                founder = new HomeFounder
                {
                    Id = "home-founder",
                    Subtitle = "Know your Doctor",
                    DoctorName = "Dr. Rizwana Khan",
                    Title = "Founder & Chief Dentist",
                    Description = "A proud graduate of Government Dental College, Mumbai — one of the most prestigious dental institutions in India. With around 10 years of experience, Dr. Khan has honed his expertise in a wide range of specialties including:",
                    Specialties = new List<string>
                    {
                        "Cosmetic dentistry",
                        "Dental implants",
                        "Smile designing",
                        "Root canal treatments",
                        "Full-mouth rehabilitation",
                        "Preventive care",
                        "Pediatric dentistry"
                    },
                    Mission = "Dr. Khan's mission is not just to treat dental concerns but to help patients achieve lifelong oral health, confidence, and beautiful smiles.",
                    Image = new FounderImage
                    {
                        Src = "/images/home/dr-rizwana-khan-c1.jpg?v=2",
                        Alt = "Dr. Rizwana Khan - Founder & Chief Dentist",
                        Name = "Dr. Rizwana Khan",
                        Credentials = "(BDS. Govt. Dental College, Mumbai)"
                    },
                    Philosophy = new FounderPhilosophy
                    {
                        Title = "Our Philosophy:",
                        Content = "\"DentRiz Dental Clinic was built on the belief that dentistry should be modern, compassionate, and patient-focused. Our philosophy is to combine cutting-edge technology with a human touch, ensuring every patient receives the highest standard of care. We strive to create smiles that are not only healthy but also filled with confidence and happiness.\""
                    },
                    SubtitleColor = "#2c5aa0",
                    DoctorNameColor = "#000000",
                    TitleColor = "#666666",
                    DescriptionColor = "#333333",
                    SpecialtiesColor = "#333333",
                    MissionColor = "#333333",
                    PhilosophyTitleColor = "#2c5aa0",
                    PhilosophyContentColor = "#333333",
                    ImageNameColor = "#000000",
                    CredentialsColor = "#666666",
                    BackgroundColor = "rgb(231,240,234)",
                    SubtitleFontFamily = "Arial, sans-serif",
                    DoctorNameFontFamily = "Arial, sans-serif",
                    TitleFontFamily = "Arial, sans-serif",
                    DescriptionFontFamily = "Arial, sans-serif",
                    SpecialtiesFontFamily = "Arial, sans-serif",
                    MissionFontFamily = "Arial, sans-serif",
                    PhilosophyTitleFontFamily = "Arial, sans-serif",
                    PhilosophyContentFontFamily = "Arial, sans-serif",
                    ImageNameFontFamily = "Arial, sans-serif",
                    CredentialsFontFamily = "Arial, sans-serif"
                };
                await _homeFounderRepository.CreateOrUpdateHomeFounderAsync(founder);
            }
            return founder;
        }

        public async Task<HomeFounder> CreateOrUpdateHomeFounderAsync(HomeFounder founder)
        {
            founder.Id = "home-founder"; // Ensure consistent ID
            return await _homeFounderRepository.CreateOrUpdateHomeFounderAsync(founder);
        }

        public async Task DeleteHomeFounderAsync(string id)
        {
            await _homeFounderRepository.DeleteHomeFounderAsync();
        }
    }
}
