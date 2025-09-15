using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Repositories;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Services
{
    public interface IServicesService
    {
        Task<ServicesConfig> GetServicesAsync();
        Task<ServicesConfig> CreateOrUpdateServicesAsync(ServicesConfig services);
        Task DeleteServicesAsync(string id);
        Task<Service> GetServiceByTitleAsync(string sectionTitle);
        Task<Service> CreateOrUpdateServiceAsync(Service service);
        Task DeleteServiceAsync(string sectionTitle);
    }

    public class ServicesService : IServicesService
    {
        private readonly IServicesRepository _servicesRepository;

        public ServicesService(IServicesRepository servicesRepository)
        {
            _servicesRepository = servicesRepository;
        }

        public async Task<ServicesConfig> GetServicesAsync()
        {
            var services = await _servicesRepository.GetServicesAsync();
            if (services == null)
            {
                // Create a default document if it doesn't exist
                services = new ServicesConfig();
                await _servicesRepository.CreateOrUpdateServicesAsync(services);
            }
            return services;
        }

        public async Task<ServicesConfig> CreateOrUpdateServicesAsync(ServicesConfig services)
        {
            services.Id = "services"; // Ensure consistent ID
            return await _servicesRepository.CreateOrUpdateServicesAsync(services);
        }

        public async Task DeleteServicesAsync(string id)
        {
            await _servicesRepository.DeleteServicesAsync();
        }

        public async Task<Service> GetServiceByTitleAsync(string sectionTitle)
        {
            var services = await GetServicesAsync();
            return services.ServiceList.FirstOrDefault(s => s.SectionTitle.Equals(sectionTitle, StringComparison.OrdinalIgnoreCase));
        }

        public async Task<Service> CreateOrUpdateServiceAsync(Service service)
        {
            var services = await GetServicesAsync();
            
            // Find existing service or add new one
            var existingServiceIndex = services.ServiceList.FindIndex(s => s.SectionTitle.Equals(service.SectionTitle, StringComparison.OrdinalIgnoreCase));
            
            if (existingServiceIndex >= 0)
            {
                services.ServiceList[existingServiceIndex] = service;
            }
            else
            {
                services.ServiceList.Add(service);
            }
            
            await _servicesRepository.CreateOrUpdateServicesAsync(services);
            return service;
        }

        public async Task DeleteServiceAsync(string sectionTitle)
        {
            var services = await GetServicesAsync();
            services.ServiceList.RemoveAll(s => s.SectionTitle.Equals(sectionTitle, StringComparison.OrdinalIgnoreCase));
            await _servicesRepository.CreateOrUpdateServicesAsync(services);
        }
    }
}
