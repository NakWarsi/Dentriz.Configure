using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesHeroController : ControllerBase
    {
        private readonly IServicesHeroService _servicesHeroService;

        public ServicesHeroController(IServicesHeroService servicesHeroService)
        {
            _servicesHeroService = servicesHeroService;
        }

        [HttpGet]
        public async Task<ActionResult<ServicesHero>> Get()
        {
            var hero = await _servicesHeroService.GetServicesHeroAsync();
            return Ok(hero);
        }

        [HttpPost]
        public async Task<ActionResult<ServicesHero>> Post([FromBody] ServicesHero hero)
        {
            var createdHero = await _servicesHeroService.CreateOrUpdateServicesHeroAsync(hero);
            return CreatedAtAction(nameof(Get), new { id = createdHero.Id }, createdHero);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ServicesHero>> Put(string id, [FromBody] ServicesHero hero)
        {
            if (id != hero.Id)
            {
                return BadRequest("ID mismatch");
            }
            var updatedHero = await _servicesHeroService.CreateOrUpdateServicesHeroAsync(hero);
            return Ok(updatedHero);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _servicesHeroService.DeleteServicesHeroAsync(id);
            return NoContent();
        }
    }
}
