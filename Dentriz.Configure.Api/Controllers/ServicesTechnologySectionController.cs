using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesTechnologySectionController : ControllerBase
    {
        private readonly IServicesTechnologySectionService _servicesTechnologySectionService;

        public ServicesTechnologySectionController(IServicesTechnologySectionService servicesTechnologySectionService)
        {
            _servicesTechnologySectionService = servicesTechnologySectionService;
        }

        [HttpGet]
        public async Task<ActionResult<ServicesTechnologySection>> Get()
        {
            var technologySection = await _servicesTechnologySectionService.GetServicesTechnologySectionAsync();
            return Ok(technologySection);
        }

        [HttpPost]
        public async Task<ActionResult<ServicesTechnologySection>> Post([FromBody] ServicesTechnologySection technologySection)
        {
            var createdTechnologySection = await _servicesTechnologySectionService.CreateOrUpdateServicesTechnologySectionAsync(technologySection);
            return CreatedAtAction(nameof(Get), new { id = createdTechnologySection.Id }, createdTechnologySection);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ServicesTechnologySection>> Put(string id, [FromBody] ServicesTechnologySection technologySection)
        {
            if (id != technologySection.Id)
            {
                return BadRequest("ID mismatch");
            }
            var updatedTechnologySection = await _servicesTechnologySectionService.CreateOrUpdateServicesTechnologySectionAsync(technologySection);
            return Ok(updatedTechnologySection);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _servicesTechnologySectionService.DeleteServicesTechnologySectionAsync(id);
            return NoContent();
        }
    }
}
