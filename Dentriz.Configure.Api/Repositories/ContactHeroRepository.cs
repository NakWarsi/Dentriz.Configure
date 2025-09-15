using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

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
        private const string DOCUMENT_ID = "contact-hero";
        private const string PARTITION_KEY = "contact-hero";

        public ContactHeroRepository(Container container, ILogger<ContactHeroRepository> logger) 
            : base(container, logger)
        {
        }

        public async Task<ContactHero?> GetContactHeroAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new ContactHero
                {
                    Id = doc.id ?? DOCUMENT_ID,
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
                config.Id = DOCUMENT_ID;

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

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
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
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }
    }
}
