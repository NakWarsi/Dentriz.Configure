using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;

namespace Dentriz.Configure.Api.Services
{
    public interface IHeaderService
    {
        Task<HeaderConfig?> GetHeaderConfigAsync();
        Task<HeaderConfig> CreateOrUpdateHeaderConfigAsync(HeaderConfig config);
        Task<bool> DeleteHeaderConfigAsync();
    }

    public class HeaderService : IHeaderService
    {
        private readonly IHeaderRepository _headerRepository;
        private readonly ILogger<HeaderService> _logger;

        public HeaderService(IHeaderRepository headerRepository, ILogger<HeaderService> logger)
        {
            _headerRepository = headerRepository;
            _logger = logger;
        }

        public async Task<HeaderConfig?> GetHeaderConfigAsync()
        {
            try
            {
                _logger.LogInformation("Getting header configuration");
                return await _headerRepository.GetHeaderConfigAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in HeaderService.GetHeaderConfigAsync");
                throw;
            }
        }

        public async Task<HeaderConfig> CreateOrUpdateHeaderConfigAsync(HeaderConfig config)
        {
            try
            {
                _logger.LogInformation("Creating or updating header configuration");
                return await _headerRepository.CreateOrUpdateHeaderConfigAsync(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in HeaderService.CreateOrUpdateHeaderConfigAsync");
                throw;
            }
        }

        public async Task<bool> DeleteHeaderConfigAsync()
        {
            try
            {
                _logger.LogInformation("Deleting header configuration");
                return await _headerRepository.DeleteHeaderConfigAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in HeaderService.DeleteHeaderConfigAsync");
                throw;
            }
        }
    }
}
