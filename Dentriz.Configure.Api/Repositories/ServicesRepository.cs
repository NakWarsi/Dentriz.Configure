using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IServicesRepository
    {
        Task<ServicesConfig?> GetServicesAsync();
        Task<ServicesConfig> CreateOrUpdateServicesAsync(ServicesConfig services);
        Task<bool> DeleteServicesAsync();
    }

    public class ServicesRepository : BaseRepository<dynamic>, IServicesRepository
    {
        private readonly ICosmosDbConfigurationService _configService;

        public ServicesRepository(Container container, ILogger<ServicesRepository> logger, ICosmosDbConfigurationService configService)
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<ServicesConfig?> GetServicesAsync()
        {
            try
            {
                var config = _configService.GetServicesDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new ServicesConfig
                {
                    Id = doc.id ?? config.DocumentId,
                    ServiceList = ParseServiceList(doc.serviceList)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving services config from repository");
                throw;
            }
        }

        public async Task<ServicesConfig> CreateOrUpdateServicesAsync(ServicesConfig services)
        {
            try
            {
                var docConfig = _configService.GetServicesDocumentConfig();
                services.Id = docConfig.DocumentId;

                var document = new
                {
                    id = services.Id,
                    serviceList = services.ServiceList
                };

                await CreateOrUpdateAsync(document, docConfig.DocumentId, docConfig.PartitionKey);
                return services;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving services config to repository");
                throw;
            }
        }

        public async Task<bool> DeleteServicesAsync()
        {
            var config = _configService.GetServicesDocumentConfig();
            return await DeleteAsync(config.DocumentId, config.PartitionKey);
        }

        private List<Service> ParseServiceList(dynamic serviceList)
        {
            try
            {
                if (serviceList == null)
                {
                    _logger.LogInformation("ServiceList is null in Cosmos DB document");
                    return new List<Service>();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(serviceList);
                var services = System.Text.Json.JsonSerializer.Deserialize<List<Service>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return services ?? new List<Service>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing service list from Cosmos DB");
                return new List<Service>();
            }
        }
    }
}
