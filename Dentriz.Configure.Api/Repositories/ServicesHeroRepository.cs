using Dentriz.Configure.Api.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace Dentriz.Configure.Api.Repositories
{
    public interface IServicesHeroRepository : IBaseRepository<ServicesHero> { }

    public class ServicesHeroRepository : BaseRepository<ServicesHero>, IServicesHeroRepository
    {
        public ServicesHeroRepository(Container container, ILogger<ServicesHeroRepository> logger)
            : base(container, logger)
        {
        }
    }
}
