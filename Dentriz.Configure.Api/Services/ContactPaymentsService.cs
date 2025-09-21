using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IContactPaymentsService
    {
        Task<ContactPayments> GetContactPaymentsAsync();
        Task<ContactPayments> CreateOrUpdateContactPaymentsAsync(ContactPayments config);
        Task<bool> DeleteContactPaymentsAsync();
    }

    public class ContactPaymentsService : IContactPaymentsService
    {
        private readonly IContactPaymentsRepository _repository;
        private readonly ILogger<ContactPaymentsService> _logger;

        public ContactPaymentsService(IContactPaymentsRepository repository, ILogger<ContactPaymentsService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<ContactPayments> GetContactPaymentsAsync()
        {
            try
            {
                var config = await _repository.GetContactPaymentsAsync();
                if (config == null)
                {
                    _logger.LogInformation("Contact Payments not found, creating default configuration");
                    config = new ContactPayments();
                    await _repository.CreateOrUpdateContactPaymentsAsync(config);
                }
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact payments");
                throw;
            }
        }

        public async Task<ContactPayments> CreateOrUpdateContactPaymentsAsync(ContactPayments config)
        {
            try
            {
                return await _repository.CreateOrUpdateContactPaymentsAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact payments");
                throw;
            }
        }

        public async Task<bool> DeleteContactPaymentsAsync()
        {
            try
            {
                return await _repository.DeleteContactPaymentsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact payments");
                throw;
            }
        }
    }
}
