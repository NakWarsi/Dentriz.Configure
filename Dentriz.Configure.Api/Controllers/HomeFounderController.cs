using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeFounderController : ControllerBase
    {
        private readonly IHomeFounderService _homeFounderService;

        public HomeFounderController(IHomeFounderService homeFounderService)
        {
            _homeFounderService = homeFounderService;
        }

        [HttpGet]
        public async Task<ActionResult<HomeFounder>> Get()
        {
            var founder = await _homeFounderService.GetHomeFounderAsync();
            return Ok(founder);
        }

        [HttpPost]
        public async Task<ActionResult<HomeFounder>> Post([FromBody] HomeFounder founder)
        {
            var createdFounder = await _homeFounderService.CreateOrUpdateHomeFounderAsync(founder);
            return CreatedAtAction(nameof(Get), new { id = createdFounder.Id }, createdFounder);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<HomeFounder>> Put(string id, [FromBody] HomeFounder founder)
        {
            if (id != founder.Id)
            {
                return BadRequest("ID mismatch");
            }
            var updatedFounder = await _homeFounderService.CreateOrUpdateHomeFounderAsync(founder);
            return Ok(updatedFounder);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _homeFounderService.DeleteHomeFounderAsync(id);
            return NoContent();
        }
    }
}
