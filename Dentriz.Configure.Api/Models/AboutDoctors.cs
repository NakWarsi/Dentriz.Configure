namespace Dentriz.Configure.Api.Models
{
    public class AboutDoctors
    {
        public string Id { get; set; } = "about-doctors";
        public string SectionTitle { get; set; } = "Meet the Top Dentists in Wakad & Hinjewadi";
        public string SectionSubtitle { get; set; } = "At DentRiz Dental Clinic, we believe every smile deserves to shine! Our expert dentists in Pune provide complete preventive, restorative, and cosmetic care - from dental implants in Wakad and cosmetic dentistry to trusted family dentistry - all under one roof with comfort and care you can trust.";
        public List<Doctor> Doctors { get; set; } = new List<Doctor>();
        public string SectionTitleColor { get; set; } = "#2c5aa0";
        public string SectionSubtitleColor { get; set; } = "#666666";
        public string DoctorNameColor { get; set; } = "#2c5aa0";
        public string DoctorTitleColor { get; set; } = "#333333";
        public string DoctorBioColor { get; set; } = "#555555";
        public string SpecialtyColor { get; set; } = "#007bff";
        public string BackgroundColor { get; set; } = "#f8f9fa";
        public string SectionTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string SectionSubtitleFontFamily { get; set; } = "Arial, sans-serif";
        public string DoctorNameFontFamily { get; set; } = "Arial, sans-serif";
        public string DoctorTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string DoctorBioFontFamily { get; set; } = "Arial, sans-serif";
        public string SpecialtyFontFamily { get; set; } = "Arial, sans-serif";
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public string Version { get; set; } = "1.0";
    }

    public class Doctor
    {
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Title2 { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public List<string> Bio { get; set; } = new List<string>();
        public List<string> Specialties { get; set; } = new List<string>();
    }
}
