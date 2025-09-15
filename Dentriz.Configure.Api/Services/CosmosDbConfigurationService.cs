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
        Container GetContactFaqContainer();
        Container GetContactHeroContainer();
        Container GetContactInfoContainer();
        Container GetContactLocationContainer();
        Container GetContactOfficeHoursContainer();
        Container GetContactPaymentsContainer();
        Container GetServicesHeroContainer();
        Container GetServicesTechnologySectionContainer();
        Container GetServicesContainer();
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
                { "AboutTechnology", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:AboutTechnology"] ?? "About-Technology") },
                { "ContactFaq", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:ContactFaq"] ?? "Contact-Faq") },
                { "ContactHero", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:ContactHero"] ?? "Contact-Hero") },
                { "ContactInfo", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:ContactInfo"] ?? "Contact-Info") },
                { "ContactLocation", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:ContactLocation"] ?? "Contact-Location") },
                { "ContactOfficeHours", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:ContactOfficeHours"] ?? "Contact-Office-Hours") },
                { "ContactPayments", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:ContactPayments"] ?? "Contact-Payments") },
                { "ServicesHero", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:ServicesHero"] ?? "Services-Hero") },
                { "ServicesTechnologySection", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:ServicesTechnologySection"] ?? "Services-Tech-Section") },
                { "Services", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:Services"] ?? "Services") }
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

        public Container GetContactFaqContainer()
        {
            return _containers["ContactFaq"];
        }

        public Container GetContactHeroContainer()
        {
            return _containers["ContactHero"];
        }

        public Container GetContactInfoContainer()
        {
            return _containers["ContactInfo"];
        }

        public Container GetContactLocationContainer()
        {
            return _containers["ContactLocation"];
        }

        public Container GetContactOfficeHoursContainer()
        {
            return _containers["ContactOfficeHours"];
        }

        public Container GetContactPaymentsContainer()
        {
            return _containers["ContactPayments"];
        }

        public Container GetServicesHeroContainer()
        {
            return _containers["ServicesHero"];
        }

        public Container GetServicesTechnologySectionContainer()
        {
            return _containers["ServicesTechnologySection"];
        }

        public Container GetServicesContainer()
        {
            return _containers["Services"];
        }
    }
}
