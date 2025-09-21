using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IContactLocationService
    {
        Task<ContactLocation> GetContactLocationAsync();
        Task<ContactLocation> CreateOrUpdateContactLocationAsync(ContactLocation config);
        Task<bool> DeleteContactLocationAsync();
    }

    public class ContactLocationService : IContactLocationService
    {
        private readonly IContactLocationRepository _repository;
        private readonly ILogger<ContactLocationService> _logger;

        public ContactLocationService(IContactLocationRepository repository, ILogger<ContactLocationService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<ContactLocation> GetContactLocationAsync()
        {
            try
            {
                var config = await _repository.GetContactLocationAsync();
                if (config == null)
                {
                    _logger.LogInformation("Contact Location not found, creating default configuration");
                    config = new ContactLocation();
                    await _repository.CreateOrUpdateContactLocationAsync(config);
                }
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact location");
                throw;
            }
        }

        public async Task<ContactLocation> CreateOrUpdateContactLocationAsync(ContactLocation config)
        {
            try
            {
                return await _repository.CreateOrUpdateContactLocationAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact location");
                throw;
            }
        }

        public async Task<bool> DeleteContactLocationAsync()
        {
            try
            {
                return await _repository.DeleteContactLocationAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact location");
                throw;
            }
        }
    }
}
