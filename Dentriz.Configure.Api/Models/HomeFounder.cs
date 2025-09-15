using System.ComponentModel.DataAnnotations;

namespace Dentriz.Configure.Api.Models
{
    public class HomeFounder
    {
        [Required]
        public string Id { get; set; } = "home-founder";

        [Required]
        public string Subtitle { get; set; } = "Know your Doctor";

        [Required]
        public string DoctorName { get; set; } = "Dr. Rizwana Khan";

        [Required]
        public string Title { get; set; } = "Founder & Chief Dentist";

        [Required]
        public string Description { get; set; } = "A proud graduate of Government Dental College, Mumbai — one of the most prestigious dental institutions in India. With around 10 years of experience, Dr. Khan has honed his expertise in a wide range of specialties including:";

        public List<string> Specialties { get; set; } = new List<string>
        {
            "Cosmetic dentistry",
            "Dental implants",
            "Smile designing",
            "Root canal treatments",
            "Full-mouth rehabilitation",
            "Preventive care",
            "Pediatric dentistry"
        };

        [Required]
        public string Mission { get; set; } = "Dr. Khan's mission is not just to treat dental concerns but to help patients achieve lifelong oral health, confidence, and beautiful smiles.";

        public FounderImage Image { get; set; } = new FounderImage
        {
            Src = "/images/home/dr-rizwana-khan-c1.jpg?v=2",
            Alt = "Dr. Rizwana Khan - Founder & Chief Dentist",
            Name = "Dr. Rizwana Khan",
            Credentials = "(BDS. Govt. Dental College, Mumbai)"
        };

        public FounderPhilosophy Philosophy { get; set; } = new FounderPhilosophy
        {
            Title = "Our Philosophy:",
            Content = "\"DentRiz Dental Clinic was built on the belief that dentistry should be modern, compassionate, and patient-focused. Our philosophy is to combine cutting-edge technology with a human touch, ensuring every patient receives the highest standard of care. We strive to create smiles that are not only healthy but also filled with confidence and happiness.\""
        };

        // Styling
        public string SubtitleColor { get; set; } = "#2c5aa0";
        public string DoctorNameColor { get; set; } = "#000000";
        public string TitleColor { get; set; } = "#666666";
        public string DescriptionColor { get; set; } = "#333333";
        public string SpecialtiesColor { get; set; } = "#333333";
        public string MissionColor { get; set; } = "#333333";
        public string PhilosophyTitleColor { get; set; } = "#2c5aa0";
        public string PhilosophyContentColor { get; set; } = "#333333";
        public string ImageNameColor { get; set; } = "#000000";
        public string CredentialsColor { get; set; } = "#666666";
        public string BackgroundColor { get; set; } = "rgb(231,240,234)";

        // Fonts
        public string SubtitleFontFamily { get; set; } = "Arial, sans-serif";
        public string DoctorNameFontFamily { get; set; } = "Arial, sans-serif";
        public string TitleFontFamily { get; set; } = "Arial, sans-serif";
        public string DescriptionFontFamily { get; set; } = "Arial, sans-serif";
        public string SpecialtiesFontFamily { get; set; } = "Arial, sans-serif";
        public string MissionFontFamily { get; set; } = "Arial, sans-serif";
        public string PhilosophyTitleFontFamily { get; set; } = "Arial, sans-serif";
        public string PhilosophyContentFontFamily { get; set; } = "Arial, sans-serif";
        public string ImageNameFontFamily { get; set; } = "Arial, sans-serif";
        public string CredentialsFontFamily { get; set; } = "Arial, sans-serif";
    }

    public class FounderImage
    {
        public string Src { get; set; } = "";
        public string Alt { get; set; } = "";
        public string Name { get; set; } = "";
        public string Credentials { get; set; } = "";
    }

    public class FounderPhilosophy
    {
        public string Title { get; set; } = "";
        public string Content { get; set; } = "";
    }
}
