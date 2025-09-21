using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IContactHeroService
    {
        Task<ContactHero> GetContactHeroAsync();
        Task<ContactHero> CreateOrUpdateContactHeroAsync(ContactHero config);
        Task<bool> DeleteContactHeroAsync();
    }

    public class ContactHeroService : IContactHeroService
    {
        private readonly IContactHeroRepository _repository;
        private readonly ILogger<ContactHeroService> _logger;

        public ContactHeroService(IContactHeroRepository repository, ILogger<ContactHeroService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<ContactHero> GetContactHeroAsync()
        {
            try
            {
                var config = await _repository.GetContactHeroAsync();
                if (config == null)
                {
                    _logger.LogInformation("Contact Hero not found, creating default configuration");
                    config = new ContactHero();
                    await _repository.CreateOrUpdateContactHeroAsync(config);
                }
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact hero");
                throw;
            }
        }

        public async Task<ContactHero> CreateOrUpdateContactHeroAsync(ContactHero config)
        {
            try
            {
                return await _repository.CreateOrUpdateContactHeroAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact hero");
                throw;
            }
        }

        public async Task<bool> DeleteContactHeroAsync()
        {
            try
            {
                return await _repository.DeleteContactHeroAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact hero");
                throw;
            }
        }
    }
}
