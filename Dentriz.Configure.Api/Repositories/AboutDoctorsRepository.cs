using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IAboutDoctorsRepository
    {
        Task<AboutDoctors?> GetAboutDoctorsAsync();
        Task<AboutDoctors> CreateOrUpdateAboutDoctorsAsync(AboutDoctors config);
        Task<bool> DeleteAboutDoctorsAsync();
    }

    public class AboutDoctorsRepository : BaseRepository<dynamic>, IAboutDoctorsRepository
    {
        private readonly ICosmosDbConfigurationService _configService;

        public AboutDoctorsRepository(Container container, ILogger<AboutDoctorsRepository> logger, ICosmosDbConfigurationService configService) 
            : base(container, logger)
        {
            _configService = configService;
        }

        public async Task<AboutDoctors?> GetAboutDoctorsAsync()
        {
            try
            {
                var config = _configService.GetAboutDoctorsDocumentConfig();
                var doc = await GetByIdAsync(config.DocumentId, config.PartitionKey);
                if (doc == null) return null;

                return new AboutDoctors
                {
                    Id = doc.id ?? config.DocumentId,
                    SectionTitle = doc.sectionTitle ?? "Meet the Top Dentists in Wakad & Hinjewadi",
                    SectionSubtitle = doc.sectionSubtitle ?? "At DentRiz Dental Clinic, we believe every smile deserves to shine! Our expert dentists in Pune provide complete preventive, restorative, and cosmetic care - from dental implants in Wakad and cosmetic dentistry to trusted family dentistry - all under one roof with comfort and care you can trust.",
                    Doctors = ParseDoctors(doc.doctors),
                    SectionTitleColor = doc.sectionTitleColor ?? "#2c5aa0",
                    SectionSubtitleColor = doc.sectionSubtitleColor ?? "#666666",
                    DoctorNameColor = doc.doctorNameColor ?? "#2c5aa0",
                    DoctorTitleColor = doc.doctorTitleColor ?? "#333333",
                    DoctorBioColor = doc.doctorBioColor ?? "#555555",
                    SpecialtyColor = doc.specialtyColor ?? "#007bff",
                    BackgroundColor = doc.backgroundColor ?? "#f8f9fa",
                    SectionTitleFontFamily = doc.sectionTitleFontFamily ?? "Arial, sans-serif",
                    SectionSubtitleFontFamily = doc.sectionSubtitleFontFamily ?? "Arial, sans-serif",
                    DoctorNameFontFamily = doc.doctorNameFontFamily ?? "Arial, sans-serif",
                    DoctorTitleFontFamily = doc.doctorTitleFontFamily ?? "Arial, sans-serif",
                    DoctorBioFontFamily = doc.doctorBioFontFamily ?? "Arial, sans-serif",
                    SpecialtyFontFamily = doc.specialtyFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving about doctors from repository");
                throw;
            }
        }

        public async Task<AboutDoctors> CreateOrUpdateAboutDoctorsAsync(AboutDoctors config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                var docConfig = _configService.GetAboutDoctorsDocumentConfig();
                config.Id = docConfig.DocumentId;

                var document = new
                {
                    id = config.Id,
                    sectionTitle = config.SectionTitle,
                    sectionSubtitle = config.SectionSubtitle,
                    doctors = config.Doctors,
                    sectionTitleColor = config.SectionTitleColor,
                    sectionSubtitleColor = config.SectionSubtitleColor,
                    doctorNameColor = config.DoctorNameColor,
                    doctorTitleColor = config.DoctorTitleColor,
                    doctorBioColor = config.DoctorBioColor,
                    specialtyColor = config.SpecialtyColor,
                    backgroundColor = config.BackgroundColor,
                    sectionTitleFontFamily = config.SectionTitleFontFamily,
                    sectionSubtitleFontFamily = config.SectionSubtitleFontFamily,
                    doctorNameFontFamily = config.DoctorNameFontFamily,
                    doctorTitleFontFamily = config.DoctorTitleFontFamily,
                    doctorBioFontFamily = config.DoctorBioFontFamily,
                    specialtyFontFamily = config.SpecialtyFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, docConfig.DocumentId, docConfig.PartitionKey);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving about doctors to repository");
                throw;
            }
        }

        public async Task<bool> DeleteAboutDoctorsAsync()
        {
            var config = _configService.GetAboutDoctorsDocumentConfig();
            return await DeleteAsync(config.DocumentId, config.PartitionKey);
        }

        private List<Doctor> ParseDoctors(dynamic doctors)
        {
            try
            {
                if (doctors == null)
                {
                    return GetDefaultDoctors();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(doctors);
                var doctorList = System.Text.Json.JsonSerializer.Deserialize<List<Doctor>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return doctorList ?? GetDefaultDoctors();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing doctors from Cosmos DB");
                return GetDefaultDoctors();
            }
        }

        private List<Doctor> GetDefaultDoctors()
        {
            return new List<Doctor>
            {
                new Doctor
                {
                    Name = "Dr. Rizwana Khan, BDS",
                    Title = "Founder and Chief Dentist",
                    Title2 = "owner",
                    Image = "/images/home/dr-rizwana-khan-c1.jpg",
                    Bio = new List<string>
                    {
                        "Dr. Rizwana Khan is a highly skilled dental professional with a <strong>Bachelor of Dental Surgery (BDS)</strong> degree from <strong>Government Dental College, Mumbai</strong> — one of India's premier dental institutions.",
                        "She has over <strong>8 years of clinical experience</strong> in dentistry, including <strong>3 years of service as a government dentist at GDC Mumbai</strong>, where she gained extensive expertise in treating a wide range of dental conditions.",
                        "Dr. Rizwana specializes in <strong>cosmetic dentistry, Invisalign treatment, and comprehensive family care</strong>. Known for her gentle approach, clear communication, and attention to detail, she ensures that every patient feels comfortable and confident throughout their treatment journey."
                    },
                    Specialties = new List<string> { "Cosmetic Dentistry", "Invisalign", "Family & Preventive Care", "Restorative Dentistry" }
                }
            };
        }
    }
}
