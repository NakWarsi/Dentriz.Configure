using Dentriz.Configure.Api.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IServicesTechnologySectionRepository : IBaseRepository<ServicesTechnologySection> { }

    public class ServicesTechnologySectionRepository : BaseRepository<ServicesTechnologySection>, IServicesTechnologySectionRepository
    {
        public ServicesTechnologySectionRepository(Container container, ILogger<ServicesTechnologySectionRepository> logger)
            : base(container, logger)
        {
        }
    }
}
