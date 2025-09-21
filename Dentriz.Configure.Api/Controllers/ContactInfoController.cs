using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactInfoController : ControllerBase
    {
        private readonly IContactInfoService _contactInfoService;
        private readonly ILogger<ContactInfoController> _logger;

        public ContactInfoController(IContactInfoService contactInfoService, ILogger<ContactInfoController> logger)
        {
            _contactInfoService = contactInfoService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<ContactInfo>> Get()
        {
            try
            {
                var config = await _contactInfoService.GetContactInfoAsync();
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact info");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ContactInfo>> Post([FromBody] ContactInfo config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactInfoService.CreateOrUpdateContactInfoAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact info");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public async Task<ActionResult<ContactInfo>> Put([FromBody] ContactInfo config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactInfoService.CreateOrUpdateContactInfoAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating contact info");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> Delete()
        {
            try
            {
                var result = await _contactInfoService.DeleteContactInfoAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact info");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
