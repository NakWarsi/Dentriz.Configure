namespace Dentriz.Configure.Api.Models
{
    public class ContactOfficeHours
    {
        public string Id { get; set; } = "contact-office-hours";
        public string SectionTitle { get; set; } = "Office Hours";
        public string SectionSubtitle { get; set; } = "Convenient hours to fit your busy schedule";
        public string MondayTime { get; set; } = "10:00 AM - 10:00 PM";
        public string TuesdayTime { get; set; } = "10:00 AM - 10:00 PM";
        public string WednesdayTime { get; set; } = "10:00 AM - 10:00 PM";
        public string ThursdayTime { get; set; } = "10:00 AM - 10:00 PM";
        public string FridayTime { get; set; } = "10:00 AM - 10:00 PM";
        public string SaturdayTime { get; set; } = "10:00 AM - 10:00 PM";
        public string SundayTime { get; set; } = "10:00 AM - 10:00 PM";
        public string NotesTitle { get; set; } = "📋 Important Notes";
        public List<string> Notes { get; set; } = new List<string>();
        public string SectionTitleColor { get; set; } = "#2c5aa0";
        public string SectionSubtitleColor { get; set; } = "#666666";
        public string DayTextColor { get; set; } = "#333333";
        public string TimeTextColor { get; set; } = "#2c5aa0";
        public string NotesTitleColor { get; set; } = "#2c5aa0";
        public string NotesTextColor { get; set; } = "#333333";
        public string BackgroundColor { get; set; } = "#f8f9fa";
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SectionSubtitleFontFamily { get; set; } = "Arial, sans-serif";
        public string DayTextFontFamily { get; set; } = "Arial, sans-serif";
        public string TimeTextFontFamily { get; set; } = "Arial, sans-serif";
        public string NotesTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string NotesTextFontFamily { get; set; } = "Arial, sans-serif";
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string Version { get; set; } = "1.0";
    }
}
