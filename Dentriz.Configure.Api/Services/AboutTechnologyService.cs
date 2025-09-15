using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IAboutTechnologyService
    {
        Task<AboutTechnology?> GetAboutTechnologyAsync();
        Task<AboutTechnology> CreateOrUpdateAboutTechnologyAsync(AboutTechnology config);
        Task<bool> DeleteAboutTechnologyAsync();
    }

    public class AboutTechnologyService : IAboutTechnologyService
    {
        private readonly IAboutTechnologyRepository _aboutTechnologyRepository;
        private readonly ILogger<AboutTechnologyService> _logger;

        public AboutTechnologyService(IAboutTechnologyRepository aboutTechnologyRepository, ILogger<AboutTechnologyService> logger)
        {
            _aboutTechnologyRepository = aboutTechnologyRepository;
            _logger = logger;
        }

        public async Task<AboutTechnology?> GetAboutTechnologyAsync()
        {
            try
            {
                _logger.LogInformation("Getting about technology configuration");
                return await _aboutTechnologyRepository.GetAboutTechnologyAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutTechnologyService.GetAboutTechnologyAsync");
                throw;
            }
        }

        public async Task<AboutTechnology> CreateOrUpdateAboutTechnologyAsync(AboutTechnology config)
        {
            try
            {
                _logger.LogInformation("Creating or updating about technology configuration");
                return await _aboutTechnologyRepository.CreateOrUpdateAboutTechnologyAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutTechnologyService.CreateOrUpdateAboutTechnologyAsync");
                throw;
            }
        }

        public async Task<bool> DeleteAboutTechnologyAsync()
        {
            try
            {
                _logger.LogInformation("Deleting about technology configuration");
                return await _aboutTechnologyRepository.DeleteAboutTechnologyAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutTechnologyService.DeleteAboutTechnologyAsync");
                throw;
            }
        }
    }
}
