using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IAboutValuesService
    {
        Task<AboutValues?> GetAboutValuesAsync();
        Task<AboutValues> CreateOrUpdateAboutValuesAsync(AboutValues config);
        Task<bool> DeleteAboutValuesAsync();
    }

    public class AboutValuesService : IAboutValuesService
    {
        private readonly IAboutValuesRepository _aboutValuesRepository;
        private readonly ILogger<AboutValuesService> _logger;

        public AboutValuesService(IAboutValuesRepository aboutValuesRepository, ILogger<AboutValuesService> logger)
        {
            _aboutValuesRepository = aboutValuesRepository;
            _logger = logger;
        }

        public async Task<AboutValues?> GetAboutValuesAsync()
        {
            try
            {
                _logger.LogInformation("Getting about values configuration");
                return await _aboutValuesRepository.GetAboutValuesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutValuesService.GetAboutValuesAsync");
                throw;
            }
        }

        public async Task<AboutValues> CreateOrUpdateAboutValuesAsync(AboutValues config)
        {
            try
            {
                _logger.LogInformation("Creating or updating about values configuration");
                return await _aboutValuesRepository.CreateOrUpdateAboutValuesAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutValuesService.CreateOrUpdateAboutValuesAsync");
                throw;
            }
        }

        public async Task<bool> DeleteAboutValuesAsync()
        {
            try
            {
                _logger.LogInformation("Deleting about values configuration");
                return await _aboutValuesRepository.DeleteAboutValuesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutValuesService.DeleteAboutValuesAsync");
                throw;
            }
        }
    }
}
