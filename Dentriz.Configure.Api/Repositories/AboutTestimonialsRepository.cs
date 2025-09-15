using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IAboutTestimonialsRepository
    {
        Task<AboutTestimonials?> GetAboutTestimonialsAsync();
        Task<AboutTestimonials> CreateOrUpdateAboutTestimonialsAsync(AboutTestimonials config);
        Task<bool> DeleteAboutTestimonialsAsync();
    }

    public class AboutTestimonialsRepository : BaseRepository<dynamic>, IAboutTestimonialsRepository
    {
        private const string DOCUMENT_ID = "about-testimonials";
        private const string PARTITION_KEY = "about-testimonials";

        public AboutTestimonialsRepository(Container container, ILogger<AboutTestimonialsRepository> logger) 
            : base(container, logger)
        {
        }

        public async Task<AboutTestimonials?> GetAboutTestimonialsAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new AboutTestimonials
                {
                    Id = doc.id ?? DOCUMENT_ID,
                    SectionTitle = doc.sectionTitle ?? "What Our Patients Say",
                    SectionSubtitle = doc.sectionSubtitle ?? "Read some of our amazing patient reviews and then contact us to experience our care for yourself!",
                    Testimonials = ParseTestimonials(doc.testimonials),
                    SectionTitleColor = doc.sectionTitleColor ?? "#2c5aa0",
                    SectionSubtitleColor = doc.sectionSubtitleColor ?? "#666666",
                    TestimonialTextColor = doc.testimonialTextColor ?? "#333333",
                    TestimonialAuthorNameColor = doc.testimonialAuthorNameColor ?? "#2c5aa0",
                    TestimonialAuthorTitleColor = doc.testimonialAuthorTitleColor ?? "#666666",
                    TestimonialStarsColor = doc.testimonialStarsColor ?? "#ffd700",
                    BackgroundColor = doc.backgroundColor ?? "#f8f9fa",
                    SectionTitleFontFamily = doc.sectionTitleFontFamily ?? "Arial, sans-serif",
                    SectionSubtitleFontFamily = doc.sectionSubtitleFontFamily ?? "Arial, sans-serif",
                    TestimonialTextFontFamily = doc.testimonialTextFontFamily ?? "Arial, sans-serif",
                    TestimonialAuthorNameFontFamily = doc.testimonialAuthorNameFontFamily ?? "Arial, sans-serif",
                    TestimonialAuthorTitleFontFamily = doc.testimonialAuthorTitleFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving about testimonials from repository");
                throw;
            }
        }

        public async Task<AboutTestimonials> CreateOrUpdateAboutTestimonialsAsync(AboutTestimonials config)
        {
            try
            {
                config.LastUpdated = DateTime.UtcNow;
                config.Id = DOCUMENT_ID;

                var document = new
                {
                    id = config.Id,
                    sectionTitle = config.SectionTitle,
                    sectionSubtitle = config.SectionSubtitle,
                    testimonials = config.Testimonials,
                    sectionTitleColor = config.SectionTitleColor,
                    sectionSubtitleColor = config.SectionSubtitleColor,
                    testimonialTextColor = config.TestimonialTextColor,
                    testimonialAuthorNameColor = config.TestimonialAuthorNameColor,
                    testimonialAuthorTitleColor = config.TestimonialAuthorTitleColor,
                    testimonialStarsColor = config.TestimonialStarsColor,
                    backgroundColor = config.BackgroundColor,
                    sectionTitleFontFamily = config.SectionTitleFontFamily,
                    sectionSubtitleFontFamily = config.SectionSubtitleFontFamily,
                    testimonialTextFontFamily = config.TestimonialTextFontFamily,
                    testimonialAuthorNameFontFamily = config.TestimonialAuthorNameFontFamily,
                    testimonialAuthorTitleFontFamily = config.TestimonialAuthorTitleFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving about testimonials to repository");
                throw;
            }
        }

        public async Task<bool> DeleteAboutTestimonialsAsync()
        {
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }

        private List<Testimonial> ParseTestimonials(dynamic testimonials)
        {
            try
            {
                if (testimonials == null)
                {
                    return GetDefaultTestimonials();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(testimonials);
                var testimonialList = System.Text.Json.JsonSerializer.Deserialize<List<Testimonial>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return testimonialList ?? GetDefaultTestimonials();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing testimonials from Cosmos DB");
                return GetDefaultTestimonials();
            }
        }

        private List<Testimonial> GetDefaultTestimonials()
        {
            return new List<Testimonial>
            {
                new Testimonial
                {
                    Stars = "⭐⭐⭐⭐⭐",
                    Text = "The staff at DentRiz Dental are friendly and efficient. Dr. Ahmed in particular is a joy to be around! The whole experience was comfortable and professional.",
                    AuthorName = "Aleena O.",
                    AuthorTitle = "Verified Patient"
                },
                new Testimonial
                {
                    Stars = "⭐⭐⭐⭐⭐",
                    Text = "First visit to DentRiz Dental and the staff couldn't be more friendly! It's amazing how much easier visiting the dentist is these days. Highly recommended!",
                    AuthorName = "Mike Zita",
                    AuthorTitle = "Verified Patient"
                },
                new Testimonial
                {
                    Stars = "⭐⭐⭐⭐⭐",
                    Text = "Staff here is amazing. Very knowledgeable and friendly. The office is exceptionally clean and operates efficiently. Highly recommended!",
                    AuthorName = "Sneha Bhosle",
                    AuthorTitle = "Verified Patient"
                }
            };
        }
    }
}
