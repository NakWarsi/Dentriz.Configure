using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeReasonsController : ControllerBase
    {
        private readonly IHomeReasonsService _homeReasonsService;

        public HomeReasonsController(IHomeReasonsService homeReasonsService)
        {
            _homeReasonsService = homeReasonsService;
        }

        [HttpGet]
        public async Task<ActionResult<HomeReasons>> Get()
        {
            var reasons = await _homeReasonsService.GetHomeReasonsAsync();
            return Ok(reasons);
        }

        [HttpPost]
        public async Task<ActionResult<HomeReasons>> Post([FromBody] HomeReasons reasons)
        {
            var createdReasons = await _homeReasonsService.CreateOrUpdateHomeReasonsAsync(reasons);
            return CreatedAtAction(nameof(Get), new { id = createdReasons.Id }, createdReasons);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<HomeReasons>> Put(string id, [FromBody] HomeReasons reasons)
        {
            if (id != reasons.Id)
            {
                return BadRequest("ID mismatch");
            }
            var updatedReasons = await _homeReasonsService.CreateOrUpdateHomeReasonsAsync(reasons);
            return Ok(updatedReasons);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _homeReasonsService.DeleteHomeReasonsAsync(id);
            return NoContent();
        }
    }
}
