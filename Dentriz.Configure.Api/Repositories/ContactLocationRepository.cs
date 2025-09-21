using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IContactLocationRepository
    {
        Task<ContactLocation?> GetContactLocationAsync();
        Task<ContactLocation> CreateOrUpdateContactLocationAsync(ContactLocation config);
        Task<bool> DeleteContactLocationAsync();
    }

    public class ContactLocationRepository : BaseRepository<dynamic>, IContactLocationRepository
    {
        private readonly ICosmosDbConfigurationService _configService;

        public ContactLocationRepository(Container container, ILogger<ContactLocationRepository> logger, ICosmosDbConfigurationService configService) 
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<ContactLocation?> GetContactLocationAsync()
        {
            try
            {
                var config = _configService.GetContactLocationDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new ContactLocation
                {
                    Id = doc.id ?? config.DocumentId,
                    SectionTitle = doc.sectionTitle ?? "Find Our Office",
                    SectionDescription = doc.sectionDescription ?? "Our dental office is conveniently located in the heart of the city, with easy access to public transportation and plenty of parking available. We're committed to making your visit as comfortable and convenient as possible.",
                    AddressTitle = doc.addressTitle ?? "📍 Address:",
                    AddressContent = doc.addressContent ?? "Dentriz Dental Clinic<br>Rohan Tarang, Wakad Chowk<br>opposit Alamgir masjid",
                    ParkingTitle = doc.parkingTitle ?? "🚗 Parking:",
                    ParkingContent = doc.parkingContent ?? "Free parking available in our lot",
                    TransitTitle = doc.transitTitle ?? "🚌 Public Transit:",
                    TransitContent = doc.transitContent ?? "Bus routes available to stop nearby<br>wakd chowk bus stop",
                    MetroTitle = doc.metroTitle ?? "♿ Metro Stop:",
                    MetroContent = doc.metroContent ?? "walking distanbce from Hinjewadi bridge(metro station)",
                    MapTitle = doc.mapTitle ?? "📍 Visit Our Clinic",
                    MapEmbedUrl = doc.mapEmbedUrl ?? "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d236.35202385690053!2d73.76117365276494!3d18.59060519688083!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b97dc645a90f%3A0xf370478ecff49ae9!2sDentriz%20dental%20clinic!5e0!3m2!1sen!2sin!4v1755898762059!5m2!1sen!2sin",
                    MapLocation = doc.mapLocation ?? "📍 Location: Wakad, Pune, Maharashtra",
                    MapHours = doc.mapHours ?? "🕒 Hours: Mon-Sun: 9:00 AM - 10:00 PM",
                    DirectionsLink = doc.directionsLink ?? "https://maps.app.goo.gl/qJdrWXYGJR8ki7BR7",
                    DirectionsText = doc.directionsText ?? "📍 Get Directions",
                    SectionTitleColor = doc.sectionTitleColor ?? "#2c5aa0",
                    SectionDescriptionColor = doc.sectionDescriptionColor ?? "#666666",
                    DetailTitleColor = doc.detailTitleColor ?? "#2c5aa0",
                    DetailContentColor = doc.detailContentColor ?? "#333333",
                    MapTitleColor = doc.mapTitleColor ?? "#2c5aa0",
                    MapInfoColor = doc.mapInfoColor ?? "#333333",
                    MapLinkColor = doc.mapLinkColor ?? "#007bff",
                    BackgroundColor = doc.backgroundColor ?? "#f8f9fa",
                    SectionTitleFontFamily = doc.sectionTitleFontFamily ?? "Arial, sans-serif",
                    SectionDescriptionFontFamily = doc.sectionDescriptionFontFamily ?? "Arial, sans-serif",
                    DetailTitleFontFamily = doc.detailTitleFontFamily ?? "Arial, sans-serif",
                    DetailContentFontFamily = doc.detailContentFontFamily ?? "Arial, sans-serif",
                    MapTitleFontFamily = doc.mapTitleFontFamily ?? "Arial, sans-serif",
                    MapInfoFontFamily = doc.mapInfoFontFamily ?? "Arial, sans-serif",
                    MapLinkFontFamily = doc.mapLinkFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contact location from repository");
                throw;
            }
        }

        public async Task<ContactLocation> CreateOrUpdateContactLocationAsync(ContactLocation config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                var docConfig = _configService.GetContactLocationDocumentConfig();
                config.Id = docConfig.DocumentId;

                var document = new
                {
                    id = config.Id,
                    sectionTitle = config.SectionTitle,
                    sectionDescription = config.SectionDescription,
                    addressTitle = config.AddressTitle,
                    addressContent = config.AddressContent,
                    parkingTitle = config.ParkingTitle,
                    parkingContent = config.ParkingContent,
                    transitTitle = config.TransitTitle,
                    transitContent = config.TransitContent,
                    metroTitle = config.MetroTitle,
                    metroContent = config.MetroContent,
                    mapTitle = config.MapTitle,
                    mapEmbedUrl = config.MapEmbedUrl,
                    mapLocation = config.MapLocation,
                    mapHours = config.MapHours,
                    directionsLink = config.DirectionsLink,
                    directionsText = config.DirectionsText,
                    sectionTitleColor = config.SectionTitleColor,
                    sectionDescriptionColor = config.SectionDescriptionColor,
                    detailTitleColor = config.DetailTitleColor,
                    detailContentColor = config.DetailContentColor,
                    mapTitleColor = config.MapTitleColor,
                    mapInfoColor = config.MapInfoColor,
                    mapLinkColor = config.MapLinkColor,
                    backgroundColor = config.BackgroundColor,
                    sectionTitleFontFamily = config.SectionTitleFontFamily,
                    sectionDescriptionFontFamily = config.SectionDescriptionFontFamily,
                    detailTitleFontFamily = config.DetailTitleFontFamily,
                    detailContentFontFamily = config.DetailContentFontFamily,
                    mapTitleFontFamily = config.MapTitleFontFamily,
                    mapInfoFontFamily = config.MapInfoFontFamily,
                    mapLinkFontFamily = config.MapLinkFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, docConfig.DocumentId, docConfig.PartitionKey);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving contact location to repository");
                throw;
            }
        }

        public async Task<bool> DeleteContactLocationAsync()
        {
            var config = _configService.GetContactLocationDocumentConfig();
            return await DeleteAsync(config.DocumentId, config.PartitionKey);
        }
    }
}
