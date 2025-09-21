using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<TestController> _logger;

        public TestController(IConfiguration configuration, ILogger<TestController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpGet("cosmos")]
        public async Task<ActionResult> TestCosmosConnection()
        {
            try
            {
                var connectionString = _configuration.GetConnectionString("CosmosDB");
                var databaseName = _configuration["CosmosDB:DatabaseName"] ?? "Dentriz";
                var containerName = _configuration["CosmosDB:ContainerName"] ?? "header";

                _logger.LogInformation("Testing Cosmos DB connection...");
                _logger.LogInformation("Database: {DatabaseName}, Container: {ContainerName}", databaseName, containerName);

                var cosmosClient = new CosmosClient(connectionString);
                var database = cosmosClient.GetDatabase(databaseName);
                var container = database.GetContainer(containerName);

                // Try to read the container properties
                var containerResponse = await container.ReadContainerAsync();
                
                _logger.LogInformation("Container exists: {ContainerId}, Partition Key: {PartitionKey}", 
                    containerResponse.Resource.Id, 
                    containerResponse.Resource.PartitionKeyPath);

                return Ok(new { 
                    message = "Cosmos DB connection successful",
                    database = databaseName,
                    container = containerName,
                    partitionKey = containerResponse.Resource.PartitionKeyPath
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Cosmos DB connection test failed");
                return StatusCode(500, new { 
                    message = "Cosmos DB connection failed", 
                    error = ex.Message 
                });
            }
        }

        [HttpPost("create-simple")]
        public async Task<ActionResult> CreateSimpleDocument()
        {
            try
            {
                var connectionString = _configuration.GetConnectionString("CosmosDB");
                var databaseName = _configuration["CosmosDB:DatabaseName"] ?? "Dentriz";
                var containerName = _configuration["CosmosDB:ContainerName"] ?? "header";

                var cosmosClient = new CosmosClient(connectionString);
                var database = cosmosClient.GetDatabase(databaseName);
                var container = database.GetContainer(containerName);

                // Create a simple test document
                var testDoc = new
                {
                    id = "test-doc",
                    name = "Test Document",
                    timestamp = DateTime.UtcNow
                };

                var response = await container.CreateItemAsync(testDoc, new PartitionKey("test-doc"));
                
                _logger.LogInformation("Test document created successfully");
                return Ok(new { 
                    message = "Test document created successfully",
                    id = response.Resource.id
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to create test document");
                return StatusCode(500, new { 
                    message = "Failed to create test document", 
                    error = ex.Message 
                });
            }
        }
    }
}
