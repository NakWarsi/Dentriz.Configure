using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Services
{
    public interface IServicesTechnologySectionService
    {
        Task<ServicesTechnologySection> GetServicesTechnologySectionAsync();
        Task<ServicesTechnologySection> CreateOrUpdateServicesTechnologySectionAsync(ServicesTechnologySection technologySection);
        Task DeleteServicesTechnologySectionAsync(string id);
    }

    public class ServicesTechnologySectionService : IServicesTechnologySectionService
    {
        private readonly IServicesTechnologySectionRepository _servicesTechnologySectionRepository;

        public ServicesTechnologySectionService(IServicesTechnologySectionRepository servicesTechnologySectionRepository)
        {
            _servicesTechnologySectionRepository = servicesTechnologySectionRepository;
        }

        public async Task<ServicesTechnologySection> GetServicesTechnologySectionAsync()
        {
            var technologySection = await _servicesTechnologySectionRepository.GetByIdAsync("services-technology-section"); // Assuming a fixed ID for the single document
            if (technologySection == null)
            {
                // Create a default document if it doesn't exist
                technologySection = new ServicesTechnologySection
                {
                    Id = "services-technology-section",
                    SectionTitle = "Advanced Technology",
                    SectionSubtitle = "We invest in the latest dental technology to provide you with the best care possible",
                    Technologies = new List<TechnologyItem>
                    {
                        new TechnologyItem
                        {
                            Icon = "🖥️",
                            Title = "CEREC Same-Day Crowns",
                            Description = "Get your crown in a single visit with our advanced CEREC technology."
                        },
                        new TechnologyItem
                        {
                            Icon = "📷",
                            Title = "Digital X-Rays",
                            Description = "Lower radiation exposure and instant results with digital imaging."
                        },
                        new TechnologyItem
                        {
                            Icon = "🔍",
                            Title = "CBCT Scanner",
                            Description = "3D imaging for precise implant planning and comprehensive diagnostics."
                        },
                        new TechnologyItem
                        {
                            Icon = "💻",
                            Title = "PrimeScan Technology",
                            Description = "Cloud-based scanning for accurate digital impressions and treatment planning."
                        }
                    },
                    SectionTitleColor = "#ffffff",
                    SectionSubtitleColor = "#ffffff",
                    BackgroundColor = "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                    CardTitleColor = "#ffffff",
                    CardDescriptionColor = "#ffffff",
                    SectionTitleFontFamily = "Arial, sans-serif",
                    SectionSubtitleFontFamily = "Arial, sans-serif",
                    CardTitleFontFamily = "Arial, sans-serif",
                    CardDescriptionFontFamily = "Arial, sans-serif"
                };
                await _servicesTechnologySectionRepository.CreateOrUpdateAsync(technologySection);
            }
            return technologySection;
        }

        public async Task<ServicesTechnologySection> CreateOrUpdateServicesTechnologySectionAsync(ServicesTechnologySection technologySection)
        {
            technologySection.Id = "services-technology-section"; // Ensure consistent ID
            return await _servicesTechnologySectionRepository.CreateOrUpdateAsync(technologySection);
        }

        public async Task DeleteServicesTechnologySectionAsync(string id)
        {
            await _servicesTechnologySectionRepository.DeleteAsync(id);
        }
    }
}
