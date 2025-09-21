using Dentriz.Configure.Api.Models;
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
        private const string DOCUMENT_ID = "services";
        private const string PARTITION_KEY = "services";

        public ServicesRepository(Container container, ILogger<ServicesRepository> logger)
            : base(container, logger)
        {
        }

        public async Task<ServicesConfig?> GetServicesAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new ServicesConfig
                {
                    Id = doc.id ?? DOCUMENT_ID,
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
                services.Id = DOCUMENT_ID;

                var document = new
                {
                    id = services.Id,
                    serviceList = services.ServiceList
                };

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
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
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
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
