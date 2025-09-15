using Dentriz.Configure.Api.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IServicesHeroRepository
    {
        Task<ServicesHero?> GetServicesHeroAsync();
        Task<ServicesHero> CreateOrUpdateServicesHeroAsync(ServicesHero hero);
        Task<bool> DeleteServicesHeroAsync();
    }

    public class ServicesHeroRepository : BaseRepository<dynamic>, IServicesHeroRepository
    {
        private const string DOCUMENT_ID = "services-hero";
        private const string PARTITION_KEY = "services-hero";

        public ServicesHeroRepository(Container container, ILogger<ServicesHeroRepository> logger)
            : base(container, logger)
        {
        }

        public async Task<ServicesHero?> GetServicesHeroAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new ServicesHero
                {
                    Id = doc.id ?? DOCUMENT_ID,
                    Title = doc.title ?? "Complete Dental Care Under One Roof",
                    Subtitle = doc.subtitle ?? "Comprehensive dental care including cosmetic dentistry, dental implants, and family dentistry in Wakad and Hinjewadi",
                    TitleColor = doc.titleColor ?? "#1e3c72",
                    SubtitleColor = doc.subtitleColor ?? "#666666",
                    BackgroundColor = doc.backgroundColor ?? "rgb(231, 241, 235)",
                    TitleFontFamily = doc.titleFontFamily ?? "Arial, sans-serif",
                    SubtitleFontFamily = doc.subtitleFontFamily ?? "Arial, sans-serif"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving services hero config from repository");
                throw;
            }
        }

        public async Task<ServicesHero> CreateOrUpdateServicesHeroAsync(ServicesHero hero)
        {
            try
            {
                hero.Id = DOCUMENT_ID;

                var document = new
                {
                    id = hero.Id,
                    title = hero.Title,
                    subtitle = hero.Subtitle,
                    titleColor = hero.TitleColor,
                    subtitleColor = hero.SubtitleColor,
                    backgroundColor = hero.BackgroundColor,
                    titleFontFamily = hero.TitleFontFamily,
                    subtitleFontFamily = hero.SubtitleFontFamily
                };

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
                return hero;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving services hero config to repository");
                throw;
            }
        }

        public async Task<bool> DeleteServicesHeroAsync()
        {
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }
    }
}
