using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Services
{
    public interface IServicesHeroService
    {
        Task<ServicesHero> GetServicesHeroAsync();
        Task<ServicesHero> CreateOrUpdateServicesHeroAsync(ServicesHero hero);
        Task DeleteServicesHeroAsync(string id);
    }

    public class ServicesHeroService : IServicesHeroService
    {
        private readonly IServicesHeroRepository _servicesHeroRepository;

        public ServicesHeroService(IServicesHeroRepository servicesHeroRepository)
        {
            _servicesHeroRepository = servicesHeroRepository;
        }

        public async Task<ServicesHero> GetServicesHeroAsync()
        {
            var hero = await _servicesHeroRepository.GetServicesHeroAsync();
            if (hero == null)
            {
                // Create a default document if it doesn't exist
                hero = new ServicesHero
                {
                    Id = "services-hero",
                    Title = "Complete Dental Care Under One Roof",
                    Subtitle = "Comprehensive dental care including cosmetic dentistry, dental implants, and family dentistry in Wakad and Hinjewadi",
                    TitleColor = "#1e3c72",
                    SubtitleColor = "#666666",
                    BackgroundColor = "rgb(231, 241, 235)",
                    TitleFontFamily = "Arial, sans-serif",
                    SubtitleFontFamily = "Arial, sans-serif"
                };
                await _servicesHeroRepository.CreateOrUpdateServicesHeroAsync(hero);
            }
            return hero;
        }

        public async Task<ServicesHero> CreateOrUpdateServicesHeroAsync(ServicesHero hero)
        {
            hero.Id = "services-hero"; // Ensure consistent ID
            return await _servicesHeroRepository.CreateOrUpdateServicesHeroAsync(hero);
        }

        public async Task DeleteServicesHeroAsync(string id)
        {
            await _servicesHeroRepository.DeleteServicesHeroAsync();
        }
    }
}
