using Microsoft.Azure.Cosmos;
using Dentriz.Configure.Api.Models;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IContactOfficeHoursRepository
    {
        Task<ContactOfficeHours?> GetContactOfficeHoursAsync();
        Task<ContactOfficeHours> CreateOrUpdateContactOfficeHoursAsync(ContactOfficeHours config);
        Task<bool> DeleteContactOfficeHoursAsync();
    }

    public class ContactOfficeHoursRepository : BaseRepository<dynamic>, IContactOfficeHoursRepository
    {
        private const string DOCUMENT_ID = "contact-office-hours";
        private const string PARTITION_KEY = "contact-office-hours";

        public ContactOfficeHoursRepository(Container container, ILogger<ContactOfficeHoursRepository> logger) 
            : base(container, logger)
        {
        }

        public async Task<ContactOfficeHours?> GetContactOfficeHoursAsync()
        {
            try
            {
                var doc = await GetByIdAsync(DOCUMENT_ID, PARTITION_KEY);
                if (doc == null) return null;

                return new ContactOfficeHours
                {
                    Id = doc.id ?? DOCUMENT_ID,
                    SectionTitle = doc.sectionTitle ?? "Office Hours",
                    SectionSubtitle = doc.sectionSubtitle ?? "Convenient hours to fit your busy schedule",
                    MondayTime = doc.mondayTime ?? "10:00 AM - 10:00 PM",
                    TuesdayTime = doc.tuesdayTime ?? "10:00 AM - 10:00 PM",
                    WednesdayTime = doc.wednesdayTime ?? "10:00 AM - 10:00 PM",
                    ThursdayTime = doc.thursdayTime ?? "10:00 AM - 10:00 PM",
                    FridayTime = doc.fridayTime ?? "10:00 AM - 10:00 PM",
                    SaturdayTime = doc.saturdayTime ?? "10:00 AM - 10:00 PM",
                    SundayTime = doc.sundayTime ?? "10:00 AM - 10:00 PM",
                    NotesTitle = doc.notesTitle ?? "📋 Important Notes",
                    Notes = ParseNotes(doc.notes),
                    SectionTitleColor = doc.sectionTitleColor ?? "#2c5aa0",
                    SectionSubtitleColor = doc.sectionSubtitleColor ?? "#666666",
                    DayTextColor = doc.dayTextColor ?? "#333333",
                    TimeTextColor = doc.timeTextColor ?? "#2c5aa0",
                    NotesTitleColor = doc.notesTitleColor ?? "#2c5aa0",
                    NotesTextColor = doc.notesTextColor ?? "#333333",
                    BackgroundColor = doc.backgroundColor ?? "#f8f9fa",
                    SectionTitleFontFamily = doc.sectionTitleFontFamily ?? "Arial, sans-serif",
                    SectionSubtitleFontFamily = doc.sectionSubtitleFontFamily ?? "Arial, sans-serif",
                    DayTextFontFamily = doc.dayTextFontFamily ?? "Arial, sans-serif",
                    TimeTextFontFamily = doc.timeTextFontFamily ?? "Arial, sans-serif",
                    NotesTitleFontFamily = doc.notesTitleFontFamily ?? "Arial, sans-serif",
                    NotesTextFontFamily = doc.notesTextFontFamily ?? "Arial, sans-serif",
                    LastUpdated = doc.lastUpdated ?? DateTime.UtcNow,
                    Version = doc.version ?? "1.0"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contact office hours from repository");
                throw;
            }
        }

        public async Task<ContactOfficeHours> CreateOrUpdateContactOfficeHoursAsync(ContactOfficeHours config)
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
                    mondayTime = config.MondayTime,
                    tuesdayTime = config.TuesdayTime,
                    wednesdayTime = config.WednesdayTime,
                    thursdayTime = config.ThursdayTime,
                    fridayTime = config.FridayTime,
                    saturdayTime = config.SaturdayTime,
                    sundayTime = config.SundayTime,
                    notesTitle = config.NotesTitle,
                    notes = config.Notes,
                    sectionTitleColor = config.SectionTitleColor,
                    sectionSubtitleColor = config.SectionSubtitleColor,
                    dayTextColor = config.DayTextColor,
                    timeTextColor = config.TimeTextColor,
                    notesTitleColor = config.NotesTitleColor,
                    notesTextColor = config.NotesTextColor,
                    backgroundColor = config.BackgroundColor,
                    sectionTitleFontFamily = config.SectionTitleFontFamily,
                    sectionSubtitleFontFamily = config.SectionSubtitleFontFamily,
                    dayTextFontFamily = config.DayTextFontFamily,
                    timeTextFontFamily = config.TimeTextFontFamily,
                    notesTitleFontFamily = config.NotesTitleFontFamily,
                    notesTextFontFamily = config.NotesTextFontFamily,
                    lastUpdated = config.LastUpdated,
                    version = config.Version
                };

                await CreateOrUpdateAsync(document, DOCUMENT_ID, PARTITION_KEY);
                return config;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving contact office hours to repository");
                throw;
            }
        }

        public async Task<bool> DeleteContactOfficeHoursAsync()
        {
            return await DeleteAsync(DOCUMENT_ID, PARTITION_KEY);
        }

        private List<string> ParseNotes(dynamic notes)
        {
            try
            {
                if (notes == null)
                {
                    return GetDefaultNotes();
                }

                var jsonString = System.Text.Json.JsonSerializer.Serialize(notes);
                var notesList = System.Text.Json.JsonSerializer.Deserialize<List<string>>(jsonString, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return notesList ?? GetDefaultNotes();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing notes from Cosmos DB");
                return GetDefaultNotes();
            }
        }

        private List<string> GetDefaultNotes()
        {
            return new List<string>
            {
                "We offer flexible appointment scheduling for our dental clinic in Wakad",
                "Emergency appointments available outside regular hours",
                "New patients welcome - call to schedule your first visit at the best dentist in Wakad",
                "We accept most insurance plans for dental implants in Wakad and cosmetic dentistry in Wakad",
                "Conveniently located dental clinic in Hinjewadi and Wakad for all your dental needs"
            };
        }
    }
}
