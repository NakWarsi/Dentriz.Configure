namespace Dentriz.Configure.Api.Models
{
    public class CosmosDbConfiguration
    {
        public string DatabaseName { get; set; } = string.Empty;
        public Dictionary<string, string> Containers { get; set; } = new();
        public Dictionary<string, DocumentConfiguration> Documents { get; set; } = new();
    }

    public class DocumentConfiguration
    {
        public string DocumentId { get; set; } = string.Empty;
        public string PartitionKey { get; set; } = string.Empty;
    }
}
