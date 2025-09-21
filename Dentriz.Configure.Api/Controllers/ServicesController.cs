using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly IServicesService _servicesService;

        public ServicesController(IServicesService servicesService)
        {
            _servicesService = servicesService;
        }

        [HttpGet]
        public async Task<ActionResult<ServicesConfig>> Get()
        {
            var services = await _servicesService.GetServicesAsync();
            return Ok(services);
        }

        [HttpPost]
        public async Task<ActionResult<ServicesConfig>> Post([FromBody] ServicesConfig services)
        {
            var createdServices = await _servicesService.CreateOrUpdateServicesAsync(services);
            return CreatedAtAction(nameof(Get), new { id = createdServices.Id }, createdServices);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ServicesConfig>> Put(string id, [FromBody] ServicesConfig services)
        {
            if (id != services.Id)
            {
                return BadRequest("ID mismatch");
            }
            var updatedServices = await _servicesService.CreateOrUpdateServicesAsync(services);
            return Ok(updatedServices);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _servicesService.DeleteServicesAsync(id);
            return NoContent();
        }

        // Individual Service endpoints
        [HttpGet("service/{sectionTitle}")]
        public async Task<ActionResult<Service>> GetService(string sectionTitle)
        {
            var service = await _servicesService.GetServiceByTitleAsync(sectionTitle);
            if (service == null)
            {
                return NotFound($"Service '{sectionTitle}' not found");
            }
            return Ok(service);
        }

        [HttpPost("service")]
        public async Task<ActionResult<Service>> PostService([FromBody] Service service)
        {
            var createdService = await _servicesService.CreateOrUpdateServiceAsync(service);
            return CreatedAtAction(nameof(GetService), new { sectionTitle = createdService.SectionTitle }, createdService);
        }

        [HttpPut("service/{sectionTitle}")]
        public async Task<ActionResult<Service>> PutService(string sectionTitle, [FromBody] Service service)
        {
            if (!sectionTitle.Equals(service.SectionTitle, StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("Section title mismatch");
            }
            var updatedService = await _servicesService.CreateOrUpdateServiceAsync(service);
            return Ok(updatedService);
        }

        [HttpDelete("service/{sectionTitle}")]
        public async Task<IActionResult> DeleteService(string sectionTitle)
        {
            await _servicesService.DeleteServiceAsync(sectionTitle);
            return NoContent();
        }
    }
}
