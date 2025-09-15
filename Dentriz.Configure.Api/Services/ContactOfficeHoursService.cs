using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IContactOfficeHoursService
    {
        Task<ContactOfficeHours> GetContactOfficeHoursAsync();
        Task<ContactOfficeHours> CreateOrUpdateContactOfficeHoursAsync(ContactOfficeHours config);
        Task<bool> DeleteContactOfficeHoursAsync();
    }

    public class ContactOfficeHoursService : IContactOfficeHoursService
    {
        private readonly IContactOfficeHoursRepository _repository;
        private readonly ILogger<ContactOfficeHoursService> _logger;

        public ContactOfficeHoursService(IContactOfficeHoursRepository repository, ILogger<ContactOfficeHoursService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<ContactOfficeHours> GetContactOfficeHoursAsync()
        {
            try
            {
                var config = await _repository.GetContactOfficeHoursAsync();
                if (config == null)
                {
                    _logger.LogInformation("Contact Office Hours not found, creating default configuration");
                    config = new ContactOfficeHours();
                    await _repository.CreateOrUpdateContactOfficeHoursAsync(config);
                }
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact office hours");
                throw;
            }
        }

        public async Task<ContactOfficeHours> CreateOrUpdateContactOfficeHoursAsync(ContactOfficeHours config)
        {
            try
            {
                return await _repository.CreateOrUpdateContactOfficeHoursAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact office hours");
                throw;
            }
        }

        public async Task<bool> DeleteContactOfficeHoursAsync()
        {
            try
            {
                return await _repository.DeleteContactOfficeHoursAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact office hours");
                throw;
            }
        }
    }
}
