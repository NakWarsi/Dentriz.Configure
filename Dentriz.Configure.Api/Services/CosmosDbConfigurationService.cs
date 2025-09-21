using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

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
        Container GetHomeFounderContainer();
        Container GetHomeNewPatientContainer();
        Container GetHomeReasonsContainer();
        Container GetHomeServicesContainer();
        
        // Document configuration methods
        DocumentConfiguration GetHeaderDocumentConfig();
        DocumentConfiguration GetGalleryContentDocumentConfig();
        DocumentConfiguration GetGalleryHeroDocumentConfig();
        DocumentConfiguration GetGalleryStatsDocumentConfig();
        DocumentConfiguration GetAboutDoctorsDocumentConfig();
        DocumentConfiguration GetAboutValuesDocumentConfig();
        DocumentConfiguration GetAboutTestimonialsDocumentConfig();
        DocumentConfiguration GetAboutTechnologyDocumentConfig();
        DocumentConfiguration GetContactFaqDocumentConfig();
        DocumentConfiguration GetContactHeroDocumentConfig();
        DocumentConfiguration GetContactInfoDocumentConfig();
        DocumentConfiguration GetContactLocationDocumentConfig();
        DocumentConfiguration GetContactOfficeHoursDocumentConfig();
        DocumentConfiguration GetContactPaymentsDocumentConfig();
        DocumentConfiguration GetServicesHeroDocumentConfig();
        DocumentConfiguration GetServicesTechnologySectionDocumentConfig();
        DocumentConfiguration GetServicesDocumentConfig();
        DocumentConfiguration GetHomeFounderDocumentConfig();
        DocumentConfiguration GetHomeNewPatientDocumentConfig();
        DocumentConfiguration GetHomeReasonsDocumentConfig();
        DocumentConfiguration GetHomeServicesDocumentConfig();
    }

    public class CosmosDbConfigurationService : ICosmosDbConfigurationService
    {
        private readonly CosmosClient _cosmosClient;
        private readonly string _databaseName;
        private readonly Dictionary<string, Container> _containers;
        private readonly Dictionary<string, DocumentConfiguration> _documentConfigs;

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
                { "Services", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:Services"] ?? "Services") },
                { "HomeFounder", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:HomeFounder"] ?? "Home-Founder") },
                { "HomeNewPatient", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:HomeNewPatient"] ?? "Home-NewPatient") },
                { "HomeReasons", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:HomeReasons"] ?? "Home-Reasons") },
                { "HomeServices", _cosmosClient.GetContainer(_databaseName, configuration["CosmosDB:Containers:HomeServices"] ?? "Home-Services") }
            };

            // Initialize document configurations
            _documentConfigs = new Dictionary<string, DocumentConfiguration>
            {
                { "Header", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:Header:DocumentId"] ?? "header-config", PartitionKey = configuration["CosmosDB:Documents:Header:PartitionKey"] ?? "header-config" } },
                { "GalleryContent", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:GalleryContent:DocumentId"] ?? "gallery-content", PartitionKey = configuration["CosmosDB:Documents:GalleryContent:PartitionKey"] ?? "gallery-content" } },
                { "GalleryHero", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:GalleryHero:DocumentId"] ?? "gallery-hero", PartitionKey = configuration["CosmosDB:Documents:GalleryHero:PartitionKey"] ?? "gallery-hero" } },
                { "GalleryStats", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:GalleryStats:DocumentId"] ?? "gallery-stats", PartitionKey = configuration["CosmosDB:Documents:GalleryStats:PartitionKey"] ?? "gallery-stats" } },
                { "AboutDoctors", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:AboutDoctors:DocumentId"] ?? "about-doctors", PartitionKey = configuration["CosmosDB:Documents:AboutDoctors:PartitionKey"] ?? "about-doctors" } },
                { "AboutValues", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:AboutValues:DocumentId"] ?? "about-values", PartitionKey = configuration["CosmosDB:Documents:AboutValues:PartitionKey"] ?? "about-values" } },
                { "AboutTestimonials", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:AboutTestimonials:DocumentId"] ?? "about-testimonials", PartitionKey = configuration["CosmosDB:Documents:AboutTestimonials:PartitionKey"] ?? "about-testimonials" } },
                { "AboutTechnology", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:AboutTechnology:DocumentId"] ?? "about-technology", PartitionKey = configuration["CosmosDB:Documents:AboutTechnology:PartitionKey"] ?? "about-technology" } },
                { "ContactFaq", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:ContactFaq:DocumentId"] ?? "contact-faq", PartitionKey = configuration["CosmosDB:Documents:ContactFaq:PartitionKey"] ?? "contact-faq" } },
                { "ContactHero", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:ContactHero:DocumentId"] ?? "contact-hero", PartitionKey = configuration["CosmosDB:Documents:ContactHero:PartitionKey"] ?? "contact-hero" } },
                { "ContactInfo", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:ContactInfo:DocumentId"] ?? "contact-info", PartitionKey = configuration["CosmosDB:Documents:ContactInfo:PartitionKey"] ?? "contact-info" } },
                { "ContactLocation", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:ContactLocation:DocumentId"] ?? "contact-location", PartitionKey = configuration["CosmosDB:Documents:ContactLocation:PartitionKey"] ?? "contact-location" } },
                { "ContactOfficeHours", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:ContactOfficeHours:DocumentId"] ?? "contact-office-hours", PartitionKey = configuration["CosmosDB:Documents:ContactOfficeHours:PartitionKey"] ?? "contact-office-hours" } },
                { "ContactPayments", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:ContactPayments:DocumentId"] ?? "contact-payments", PartitionKey = configuration["CosmosDB:Documents:ContactPayments:PartitionKey"] ?? "contact-payments" } },
                { "ServicesHero", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:ServicesHero:DocumentId"] ?? "services-hero", PartitionKey = configuration["CosmosDB:Documents:ServicesHero:PartitionKey"] ?? "services-hero" } },
                { "ServicesTechnologySection", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:ServicesTechnologySection:DocumentId"] ?? "services-technology-section", PartitionKey = configuration["CosmosDB:Documents:ServicesTechnologySection:PartitionKey"] ?? "services-technology-section" } },
                { "Services", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:Services:DocumentId"] ?? "services", PartitionKey = configuration["CosmosDB:Documents:Services:PartitionKey"] ?? "services" } },
                { "HomeFounder", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:HomeFounder:DocumentId"] ?? "home-founder", PartitionKey = configuration["CosmosDB:Documents:HomeFounder:PartitionKey"] ?? "home-founder" } },
                { "HomeNewPatient", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:HomeNewPatient:DocumentId"] ?? "home-new-patient", PartitionKey = configuration["CosmosDB:Documents:HomeNewPatient:PartitionKey"] ?? "home-new-patient" } },
                { "HomeReasons", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:HomeReasons:DocumentId"] ?? "home-reasons", PartitionKey = configuration["CosmosDB:Documents:HomeReasons:PartitionKey"] ?? "home-reasons" } },
                { "HomeServices", new DocumentConfiguration { DocumentId = configuration["CosmosDB:Documents:HomeServices:DocumentId"] ?? "home-services", PartitionKey = configuration["CosmosDB:Documents:HomeServices:PartitionKey"] ?? "home-services" } }
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

        public Container GetHomeFounderContainer()
        {
            return _containers["HomeFounder"];
        }

        public Container GetHomeNewPatientContainer()
        {
            return _containers["HomeNewPatient"];
        }

        public Container GetHomeReasonsContainer()
        {
            return _containers["HomeReasons"];
        }

        public Container GetHomeServicesContainer()
        {
            return _containers["HomeServices"];
        }

        // Document configuration methods
        public DocumentConfiguration GetHeaderDocumentConfig()
        {
            return _documentConfigs["Header"];
        }

        public DocumentConfiguration GetGalleryContentDocumentConfig()
        {
            return _documentConfigs["GalleryContent"];
        }

        public DocumentConfiguration GetGalleryHeroDocumentConfig()
        {
            return _documentConfigs["GalleryHero"];
        }

        public DocumentConfiguration GetGalleryStatsDocumentConfig()
        {
            return _documentConfigs["GalleryStats"];
        }

        public DocumentConfiguration GetAboutDoctorsDocumentConfig()
        {
            return _documentConfigs["AboutDoctors"];
        }

        public DocumentConfiguration GetAboutValuesDocumentConfig()
        {
            return _documentConfigs["AboutValues"];
        }

        public DocumentConfiguration GetAboutTestimonialsDocumentConfig()
        {
            return _documentConfigs["AboutTestimonials"];
        }

        public DocumentConfiguration GetAboutTechnologyDocumentConfig()
        {
            return _documentConfigs["AboutTechnology"];
        }

        public DocumentConfiguration GetContactFaqDocumentConfig()
        {
            return _documentConfigs["ContactFaq"];
        }

        public DocumentConfiguration GetContactHeroDocumentConfig()
        {
            return _documentConfigs["ContactHero"];
        }

        public DocumentConfiguration GetContactInfoDocumentConfig()
        {
            return _documentConfigs["ContactInfo"];
        }

        public DocumentConfiguration GetContactLocationDocumentConfig()
        {
            return _documentConfigs["ContactLocation"];
        }

        public DocumentConfiguration GetContactOfficeHoursDocumentConfig()
        {
            return _documentConfigs["ContactOfficeHours"];
        }

        public DocumentConfiguration GetContactPaymentsDocumentConfig()
        {
            return _documentConfigs["ContactPayments"];
        }

        public DocumentConfiguration GetServicesHeroDocumentConfig()
        {
            return _documentConfigs["ServicesHero"];
        }

        public DocumentConfiguration GetServicesTechnologySectionDocumentConfig()
        {
            return _documentConfigs["ServicesTechnologySection"];
        }

        public DocumentConfiguration GetServicesDocumentConfig()
        {
            return _documentConfigs["Services"];
        }

        public DocumentConfiguration GetHomeFounderDocumentConfig()
        {
            return _documentConfigs["HomeFounder"];
        }

        public DocumentConfiguration GetHomeNewPatientDocumentConfig()
        {
            return _documentConfigs["HomeNewPatient"];
        }

        public DocumentConfiguration GetHomeReasonsDocumentConfig()
        {
            return _documentConfigs["HomeReasons"];
        }

        public DocumentConfiguration GetHomeServicesDocumentConfig()
        {
            return _documentConfigs["HomeServices"];
        }
    }
}
