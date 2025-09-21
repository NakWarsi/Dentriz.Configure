using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IHomeFounderRepository
    {
        Task<HomeFounder?> GetHomeFounderAsync();
        Task<HomeFounder> CreateOrUpdateHomeFounderAsync(HomeFounder founder);
        Task<bool> DeleteHomeFounderAsync();
    }

    public class HomeFounderRepository : BaseRepository<dynamic>, IHomeFounderRepository
    {
        private readonly ICosmosDbConfigurationService _configService;

        public HomeFounderRepository(Container container, ILogger<HomeFounderRepository> logger, ICosmosDbConfigurationService configService)
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<HomeFounder?> GetHomeFounderAsync()
        {
            try
            {
                var config = _configService.GetHomeFounderDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new HomeFounder
                {
                    Id = doc.id ?? config.DocumentId,
                    Subtitle = doc.subtitle ?? "Know your Doctor",
                    DoctorName = doc.doctorName ?? "Dr. Rizwana Khan",
                    Title = doc.title ?? "Founder & Chief Dentist",
                    Description = doc.description ?? "A proud graduate of Government Dental College, Mumbai — one of the most prestigious dental institutions in India. With around 10 years of experience, Dr. Khan has honed his expertise in a wide range of specialties including:",
                    Specialties = ParseStringList(doc.specialties),
                    Mission = doc.mission ?? "Dr. Khan's mission is not just to treat dental concerns but to help patients achieve lifelong oral health, confidence, and beautiful smiles.",
                    Image = ParseFounderImage(doc.image),
                    Philosophy = ParseFounderPhilosophy(doc.philosophy),
                    SubtitleColor = doc.subtitleColor ?? "#2c5aa0",
                    DoctorNameColor = doc.doctorNameColor ?? "#000000",
                    TitleColor = doc.titleColor ?? "#666666",
                    DescriptionColor = doc.descriptionColor ?? "#333333",
                    SpecialtiesColor = doc.specialtiesColor ?? "#333333",
                    MissionColor = doc.missionColor ?? "#333333",
                    PhilosophyTitleColor = doc.philosophyTitleColor ?? "#2c5aa0",
                    PhilosophyContentColor = doc.philosophyContentColor ?? "#333333",
                    ImageNameColor = doc.imageNameColor ?? "#000000",
                    CredentialsColor = doc.credentialsColor ?? "#666666",
                    BackgroundColor = doc.backgroundColor ?? "rgb(231,240,234)",
                    SubtitleFontFamily = doc.subtitleFontFamily ?? "Arial, sans-serif",
                    DoctorNameFontFamily = doc.doctorNameFontFamily ?? "Arial, sans-serif",
                    TitleFontFamily = doc.titleFontFamily ?? "Arial, sans-serif",
                    DescriptionFontFamily = doc.descriptionFontFamily ?? "Arial, sans-serif",
                    SpecialtiesFontFamily = doc.specialtiesFontFamily ?? "Arial, sans-serif",
                    MissionFontFamily = doc.missionFontFamily ?? "Arial, sans-serif",
                    PhilosophyTitleFontFamily = doc.philosophyTitleFontFamily ?? "Arial, sans-serif",
                    PhilosophyContentFontFamily = doc.philosophyContentFontFamily ?? "Arial, sans-serif",
                    ImageNameFontFamily = doc.imageNameFontFamily ?? "Arial, sans-serif",
                    CredentialsFontFamily = doc.credentialsFontFamily ?? "Arial, sans-serif"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving home founder config from repository");
                throw;
            }
        }

        public async Task<HomeFounder> CreateOrUpdateHomeFounderAsync(HomeFounder founder)
        {
            try
            {
                var docConfig = _configService.GetHomeFounderDocumentConfig();
                founder.Id = docConfig.DocumentId;

                var document = new
                {
                    id = founder.Id,
                    subtitle = founder.Subtitle,
                    doctorName = founder.DoctorName,
                    title = founder.Title,
                    description = founder.Description,
                    specialties = founder.Specialties,
                    mission = founder.Mission,
                    image = founder.Image,
                    philosophy = founder.Philosophy,
                    subtitleColor = founder.SubtitleColor,
                    doctorNameColor = founder.DoctorNameColor,
                    titleColor = founder.TitleColor,
                    descriptionColor = founder.DescriptionColor,
                    specialtiesColor = founder.SpecialtiesColor,
                    missionColor = founder.MissionColor,
                    philosophyTitleColor = founder.PhilosophyTitleColor,
                    philosophyContentColor = founder.PhilosophyContentColor,
                    imageNameColor = founder.ImageNameColor,
                    credentialsColor = founder.CredentialsColor,
                    backgroundColor = founder.BackgroundColor,
                    subtitleFontFamily = founder.SubtitleFontFamily,
                    doctorNameFontFamily = founder.DoctorNameFontFamily,
                    titleFontFamily = founder.TitleFontFamily,
                    descriptionFontFamily = founder.DescriptionFontFamily,
                    specialtiesFontFamily = founder.SpecialtiesFontFamily,
                    missionFontFamily = founder.MissionFontFamily,
                    philosophyTitleFontFamily = founder.PhilosophyTitleFontFamily,
                    philosophyContentFontFamily = founder.PhilosophyContentFontFamily,
                    imageNameFontFamily = founder.ImageNameFontFamily,
                    credentialsFontFamily = founder.CredentialsFontFamily
                };

                await CreateOrUpdateAsync(document, docConfig.DocumentId, docConfig.PartitionKey);
                return founder;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving home founder config to repository");
                throw;
            }
        }

        public async Task<bool> DeleteHomeFounderAsync()
        {
            var config = _configService.GetHomeFounderDocumentConfig();
            return await DeleteAsync(config.DocumentId, config.PartitionKey);
        }

        private List<string> ParseStringList(dynamic list)
        {
            try
            {
                if (list == null)
                {
                    _logger.LogInformation("List is null in Cosmos DB document");
                    return new List<string>();
                }

                var jsonString = JsonSerializer.Serialize(list);
                var items = JsonSerializer.Deserialize<List<string>>(jsonString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return items ?? new List<string>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing string list from Cosmos DB");
                return new List<string>();
            }
        }

        private FounderImage ParseFounderImage(dynamic image)
        {
            try
            {
                if (image == null)
                {
                    _logger.LogInformation("Image is null in Cosmos DB document");
                    return new FounderImage();
                }

                var jsonString = JsonSerializer.Serialize(image);
                var founderImage = JsonSerializer.Deserialize<FounderImage>(jsonString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return founderImage ?? new FounderImage();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing founder image from Cosmos DB");
                return new FounderImage();
            }
        }

        private FounderPhilosophy ParseFounderPhilosophy(dynamic philosophy)
        {
            try
            {
                if (philosophy == null)
                {
                    _logger.LogInformation("Philosophy is null in Cosmos DB document");
                    return new FounderPhilosophy();
                }

                var jsonString = JsonSerializer.Serialize(philosophy);
                var founderPhilosophy = JsonSerializer.Deserialize<FounderPhilosophy>(jsonString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return founderPhilosophy ?? new FounderPhilosophy();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing founder philosophy from Cosmos DB");
                return new FounderPhilosophy();
            }
        }
    }
}
