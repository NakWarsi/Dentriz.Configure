using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactHeroController : ControllerBase
    {
        private readonly IContactHeroService _contactHeroService;
        private readonly ILogger<ContactHeroController> _logger;

        public ContactHeroController(IContactHeroService contactHeroService, ILogger<ContactHeroController> logger)
        {
            _contactHeroService = contactHeroService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<ContactHero>> Get()
        {
            try
            {
                var config = await _contactHeroService.GetContactHeroAsync();
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact hero");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ContactHero>> Post([FromBody] ContactHero config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactHeroService.CreateOrUpdateContactHeroAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact hero");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public async Task<ActionResult<ContactHero>> Put([FromBody] ContactHero config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactHeroService.CreateOrUpdateContactHeroAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating contact hero");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> Delete()
        {
            try
            {
                var result = await _contactHeroService.DeleteContactHeroAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact hero");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
