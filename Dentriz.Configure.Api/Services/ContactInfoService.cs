using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IContactInfoService
    {
        Task<ContactInfo> GetContactInfoAsync();
        Task<ContactInfo> CreateOrUpdateContactInfoAsync(ContactInfo config);
        Task<bool> DeleteContactInfoAsync();
    }

    public class ContactInfoService : IContactInfoService
    {
        private readonly IContactInfoRepository _repository;
        private readonly ILogger<ContactInfoService> _logger;

        public ContactInfoService(IContactInfoRepository repository, ILogger<ContactInfoService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<ContactInfo> GetContactInfoAsync()
        {
            try
            {
                var config = await _repository.GetContactInfoAsync();
                if (config == null)
                {
                    _logger.LogInformation("Contact Info not found, creating default configuration");
                    config = new ContactInfo();
                    await _repository.CreateOrUpdateContactInfoAsync(config);
                }
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact info");
                throw;
            }
        }

        public async Task<ContactInfo> CreateOrUpdateContactInfoAsync(ContactInfo config)
        {
            try
            {
                return await _repository.CreateOrUpdateContactInfoAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact info");
                throw;
            }
        }

        public async Task<bool> DeleteContactInfoAsync()
        {
            try
            {
                return await _repository.DeleteContactInfoAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact info");
                throw;
            }
        }
    }
}
