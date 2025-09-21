using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
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
        private readonly ICosmosDbConfigurationService _configService;

        public ServicesHeroRepository(Container container, ILogger<ServicesHeroRepository> logger, ICosmosDbConfigurationService configService)
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<ServicesHero?> GetServicesHeroAsync()
        {
            try
            {
                var config = _configService.GetServicesHeroDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new ServicesHero
                {
                    Id = doc.id ?? config.DocumentId,
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
                var config = _configService.GetServicesHeroDocumentConfig();
                hero.Id = config.DocumentId;

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

                await CreateOrUpdateAsync(document, config.DocumentId, config.PartitionKey);
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
            var config = _configService.GetServicesHeroDocumentConfig();
            return await DeleteAsync(config.DocumentId, config.PartitionKey);
        }
    }
}
