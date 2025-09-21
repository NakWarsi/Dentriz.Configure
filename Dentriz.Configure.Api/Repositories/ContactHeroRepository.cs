using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IContactHeroRepository
    {
        Task<ContactHero?> GetContactHeroAsync();
        Task<ContactHero> CreateOrUpdateContactHeroAsync(ContactHero config);
        Task<bool> DeleteContactHeroAsync();
    }

    public class ContactHeroRepository : BaseRepository<dynamic>, IContactHeroRepository
    {
        private readonly ICosmosDbConfigurationService _configService;

        public ContactHeroRepository(Container container, ILogger<ContactHeroRepository> logger, ICosmosDbConfigurationService configService) 
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<ContactHero?> GetContactHeroAsync()
        {
            try
            {
                var config = _configService.GetContactHeroDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new ContactHero
                {
                    Id = doc.id ?? config.DocumentId,
                    HeroTitle = doc.heroTitle ?? "Contact the Best Dentists in Pune",
                    HeroSubtitle = doc.heroSubtitle ?? "Get in touch with DentRiz Dental Clinic and it's associated Doctors",
                    HeroTitleColor = doc.heroTitleColor ?? "#2c5aa0",
                    HeroSubtitleColor = doc.heroSubtitleColor ?? "#333333",
                    HeroTitleFontFamily = doc.heroTitleFontFamily ?? "Arial, sans-serif",
                    HeroSubtitleFontFamily = doc.heroSubtitleFontFamily ?? "Arial, sans-serif",
                    BackgroundColor = doc.backgroundColor ?? "#f8f9fa",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contact hero from repository");
                throw;
            }
        }

        public async Task<ContactHero> CreateOrUpdateContactHeroAsync(ContactHero config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                var docConfig = _configService.GetContactHeroDocumentConfig();
                config.Id = docConfig.DocumentId;

                var document = new
                {
                    id = config.Id,
                    heroTitle = config.HeroTitle,
                    heroSubtitle = config.HeroSubtitle,
                    heroTitleColor = config.HeroTitleColor,
                    heroSubtitleColor = config.HeroSubtitleColor,
                    heroTitleFontFamily = config.HeroTitleFontFamily,
                    heroSubtitleFontFamily = config.HeroSubtitleFontFamily,
                    backgroundColor = config.BackgroundColor,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, docConfig.DocumentId, docConfig.PartitionKey);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving contact hero to repository");
                throw;
            }
        }

        public async Task<bool> DeleteContactHeroAsync()
        {
            var config = _configService.GetContactHeroDocumentConfig();
            return await DeleteAsync(config.DocumentId, config.PartitionKey);
        }
    }
}
