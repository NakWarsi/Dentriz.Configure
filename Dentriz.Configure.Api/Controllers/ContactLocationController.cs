using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactLocationController : ControllerBase
    {
        private readonly IContactLocationService _contactLocationService;
        private readonly ILogger<ContactLocationController> _logger;

        public ContactLocationController(IContactLocationService contactLocationService, ILogger<ContactLocationController> logger)
        {
            _contactLocationService = contactLocationService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<ContactLocation>> Get()
        {
            try
            {
                var config = await _contactLocationService.GetContactLocationAsync();
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact location");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ContactLocation>> Post([FromBody] ContactLocation config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactLocationService.CreateOrUpdateContactLocationAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact location");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public async Task<ActionResult<ContactLocation>> Put([FromBody] ContactLocation config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactLocationService.CreateOrUpdateContactLocationAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating contact location");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> Delete()
        {
            try
            {
                var result = await _contactLocationService.DeleteContactLocationAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact location");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
