using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IAboutDoctorsService
    {
        Task<AboutDoctors?> GetAboutDoctorsAsync();
        Task<AboutDoctors> CreateOrUpdateAboutDoctorsAsync(AboutDoctors config);
        Task<bool> DeleteAboutDoctorsAsync();
    }

    public class AboutDoctorsService : IAboutDoctorsService
    {
        private readonly IAboutDoctorsRepository _aboutDoctorsRepository;
        private readonly ILogger<AboutDoctorsService> _logger;

        public AboutDoctorsService(IAboutDoctorsRepository aboutDoctorsRepository, ILogger<AboutDoctorsService> logger)
        {
            _aboutDoctorsRepository = aboutDoctorsRepository;
            _logger = logger;
        }

        public async Task<AboutDoctors?> GetAboutDoctorsAsync()
        {
            try
            {
                _logger.LogInformation("Getting about doctors configuration");
                return await _aboutDoctorsRepository.GetAboutDoctorsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutDoctorsService.GetAboutDoctorsAsync");
                throw;
            }
        }

        public async Task<AboutDoctors> CreateOrUpdateAboutDoctorsAsync(AboutDoctors config)
        {
            try
            {
                _logger.LogInformation("Creating or updating about doctors configuration");
                return await _aboutDoctorsRepository.CreateOrUpdateAboutDoctorsAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutDoctorsService.CreateOrUpdateAboutDoctorsAsync");
                throw;
            }
        }

        public async Task<bool> DeleteAboutDoctorsAsync()
        {
            try
            {
                _logger.LogInformation("Deleting about doctors configuration");
                return await _aboutDoctorsRepository.DeleteAboutDoctorsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutDoctorsService.DeleteAboutDoctorsAsync");
                throw;
            }
        }
    }
}
