using Microsoft.Azure.Cosmos;
using System.Text.Json;

namespace Dentriz.Configure.Api.Repositories
{
    public abstract class BaseRepository<T> where T : class
    {
        protected readonly Container _container;
        protected readonly ILogger<BaseRepository<T>> _logger;

        protected BaseRepository(Container container, ILogger<BaseRepository<T>> logger)
        {
            _container = container;
            _logger = logger;
        }

        public virtual async Task<T?> GetByIdAsync(string id, string partitionKey)
        {
            try
            {
                var response = await _container.ReadItemAsync<T>(
                    id: id,
                    partitionKey: new PartitionKey(partitionKey)
                );

                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogInformation("Document with id '{Id}' not found in container", id);
                return null;
            }
            catch (CosmosException ex)
            {
                _logger.LogError(ex, "Cosmos DB error retrieving document with id '{Id}': {StatusCode} - {Message}", 
                    id, ex.StatusCode, ex.Message);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving document with id '{Id}' from Cosmos DB", id);
                throw;
            }
        }

        public virtual async Task<T> CreateOrUpdateAsync(T entity, string id, string partitionKey)
        {
            try
            {
                var response = await _container.UpsertItemAsync(
                    item: entity,
                    partitionKey: new PartitionKey(partitionKey)
                );

                _logger.LogInformation("Document with id '{Id}' successfully saved to Cosmos DB", id);
                return response.Resource;
            }
            catch (CosmosException ex)
            {
                _logger.LogError(ex, "Cosmos DB error saving document with id '{Id}': {StatusCode} - {Message}", 
                    id, ex.StatusCode, ex.Message);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving document with id '{Id}' to Cosmos DB", id);
                throw;
            }
        }

        public virtual async Task<bool> DeleteAsync(string id, string partitionKey)
        {
            try
            {
                await _container.DeleteItemAsync<T>(
                    id: id,
                    partitionKey: new PartitionKey(partitionKey)
                );

                _logger.LogInformation("Document with id '{Id}' successfully deleted from Cosmos DB", id);
                return true;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogInformation("Document with id '{Id}' not found for deletion", id);
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting document with id '{Id}' from Cosmos DB", id);
                throw;
            }
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync(string? query = null)
        {
            try
            {
                var sqlQuery = query ?? "SELECT * FROM c";
                var queryDefinition = new QueryDefinition(sqlQuery);
                
                var iterator = _container.GetItemQueryIterator<T>(queryDefinition);
                var results = new List<T>();

                while (iterator.HasMoreResults)
                {
                    var response = await iterator.ReadNextAsync();
                    results.AddRange(response.ToList());
                }

                _logger.LogInformation("Retrieved {Count} documents from container", results.Count);
                return results;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving documents from Cosmos DB");
                throw;
            }
        }
    }
}
