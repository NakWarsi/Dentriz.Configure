using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeServicesController : ControllerBase
    {
        private readonly IHomeServicesService _homeServicesService;

        public HomeServicesController(IHomeServicesService homeServicesService)
        {
            _homeServicesService = homeServicesService;
        }

        [HttpGet]
        public async Task<ActionResult<HomeServices>> Get()
        {
            var services = await _homeServicesService.GetHomeServicesAsync();
            return Ok(services);
        }

        [HttpPost]
        public async Task<ActionResult<HomeServices>> Post([FromBody] HomeServices services)
        {
            var createdServices = await _homeServicesService.CreateOrUpdateHomeServicesAsync(services);
            return CreatedAtAction(nameof(Get), new { id = createdServices.Id }, createdServices);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<HomeServices>> Put(string id, [FromBody] HomeServices services)
        {
            if (id != services.Id)
            {
                return BadRequest("ID mismatch");
            }
            var updatedServices = await _homeServicesService.CreateOrUpdateHomeServicesAsync(services);
            return Ok(updatedServices);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _homeServicesService.DeleteHomeServicesAsync(id);
            return NoContent();
        }
    }
}
