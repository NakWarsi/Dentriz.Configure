using Microsoft.Azure.Cosmos;

namespace Dentriz.Configure.Api.Services
{
    public interface ICosmosDbConfigurationService
    {
        Container GetHeaderContainer();
        Container GetGalleryContentContainer();
        Container GetGalleryHeroContainer();
        Container GetGalleryStatsContainer();
        Container GetAboutDoctorsContainer();
        Container GetAboutValuesContainer();
        Container GetAboutTestimonialsContainer();
        Container GetAboutTechnologyContainer();
    }

    public class CosmosDbConfigurationService : ICosmosDbConfigurationService
    {
        private readonly CosmosClient _cosmosClient;
        private readonly string _databaseName;
        private readonly Dictionary<string, Container> _containers;

        public CosmosDbConfigurationService(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("CosmosDB");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("CosmosDB connection string is not configured");
            }

            _cosmosClient = new CosmosClient(connectionString);
            _databaseName = configuration["CosmosDB:DatabaseName"] ?? "Dentriz";
            
            // Initialize containers
            _containers = new Dictionary<string, Container>
            {
                { "Header", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:Header"] ?? "header") },
                { "GalleryContent", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:GalleryContent"] ?? "GalleryContent") },
                { "GalleryHero", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:GalleryHero"] ?? "GalleryHero") },
                { "GalleryStats", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:GalleryStats"] ?? "GalleryStats") },
                { "AboutDoctors", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:AboutDoctors"] ?? "About-Doctors") },
                { "AboutValues", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:AboutValues"] ?? "About-Values") },
                { "AboutTestimonials", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:AboutTestimonials"] ?? "About-Testimonials") },
                { "AboutTechnology", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:AboutTechnology"] ?? "About-Technology") }
            };
        }

        public Container GetHeaderContainer()
        {
            return _containers["Header"];
        }

        public Container GetGalleryContentContainer()
        {
            return _containers["GalleryContent"];
        }

        public Container GetGalleryHeroContainer()
        {
            return _containers["GalleryHero"];
        }

        public Container GetGalleryStatsContainer()
        {
            return _containers["GalleryStats"];
        }

        public Container GetAboutDoctorsContainer()
        {
            return _containers["AboutDoctors"];
        }

        public Container GetAboutValuesContainer()
        {
            return _containers["AboutValues"];
        }

        public Container GetAboutTestimonialsContainer()
        {
            return _containers["AboutTestimonials"];
        }

        public Container GetAboutTechnologyContainer()
        {
            return _containers["AboutTechnology"];
        }
    }
}
