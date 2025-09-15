using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IAboutTestimonialsService
    {
        Task<AboutTestimonials?> GetAboutTestimonialsAsync();
        Task<AboutTestimonials> CreateOrUpdateAboutTestimonialsAsync(AboutTestimonials config);
        Task<bool> DeleteAboutTestimonialsAsync();
    }

    public class AboutTestimonialsService : IAboutTestimonialsService
    {
        private readonly IAboutTestimonialsRepository _aboutTestimonialsRepository;
        private readonly ILogger<AboutTestimonialsService> _logger;

        public AboutTestimonialsService(IAboutTestimonialsRepository aboutTestimonialsRepository, ILogger<AboutTestimonialsService> logger)
        {
            _aboutTestimonialsRepository = aboutTestimonialsRepository;
            _logger = logger;
        }

        public async Task<AboutTestimonials?> GetAboutTestimonialsAsync()
        {
            try
            {
                _logger.LogInformation("Getting about testimonials configuration");
                return await _aboutTestimonialsRepository.GetAboutTestimonialsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutTestimonialsService.GetAboutTestimonialsAsync");
                throw;
            }
        }

        public async Task<AboutTestimonials> CreateOrUpdateAboutTestimonialsAsync(AboutTestimonials config)
        {
            try
            {
                _logger.LogInformation("Creating or updating about testimonials configuration");
                return await _aboutTestimonialsRepository.CreateOrUpdateAboutTestimonialsAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutTestimonialsService.CreateOrUpdateAboutTestimonialsAsync");
                throw;
            }
        }

        public async Task<bool> DeleteAboutTestimonialsAsync()
        {
            try
            {
                _logger.LogInformation("Deleting about testimonials configuration");
                return await _aboutTestimonialsRepository.DeleteAboutTestimonialsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AboutTestimonialsService.DeleteAboutTestimonialsAsync");
                throw;
            }
        }
    }
}
