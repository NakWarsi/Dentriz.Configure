using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IContactFaqService
    {
        Task<ContactFaq> GetContactFaqAsync();
        Task<ContactFaq> CreateOrUpdateContactFaqAsync(ContactFaq config);
        Task<bool> DeleteContactFaqAsync();
    }

    public class ContactFaqService : IContactFaqService
    {
        private readonly IContactFaqRepository _repository;
        private readonly ILogger<ContactFaqService> _logger;

        public ContactFaqService(IContactFaqRepository repository, ILogger<ContactFaqService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<ContactFaq> GetContactFaqAsync()
        {
            try
            {
                var config = await _repository.GetContactFaqAsync();
                if (config == null)
                {
                    _logger.LogInformation("Contact FAQ not found, creating default configuration");
                    config = new ContactFaq();
                    await _repository.CreateOrUpdateContactFaqAsync(config);
                }
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact FAQ");
                throw;
            }
        }

        public async Task<ContactFaq> CreateOrUpdateContactFaqAsync(ContactFaq config)
        {
            try
            {
                return await _repository.CreateOrUpdateContactFaqAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact FAQ");
                throw;
            }
        }

        public async Task<bool> DeleteContactFaqAsync()
        {
            try
            {
                return await _repository.DeleteContactFaqAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact FAQ");
                throw;
            }
        }
    }
}
