using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactOfficeHoursController : ControllerBase
    {
        private readonly IContactOfficeHoursService _contactOfficeHoursService;
        private readonly ILogger<ContactOfficeHoursController> _logger;

        public ContactOfficeHoursController(IContactOfficeHoursService contactOfficeHoursService, ILogger<ContactOfficeHoursController> logger)
        {
            _contactOfficeHoursService = contactOfficeHoursService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<ContactOfficeHours>> Get()
        {
            try
            {
                var config = await _contactOfficeHoursService.GetContactOfficeHoursAsync();
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact office hours");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ContactOfficeHours>> Post([FromBody] ContactOfficeHours config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactOfficeHoursService.CreateOrUpdateContactOfficeHoursAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact office hours");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public async Task<ActionResult<ContactOfficeHours>> Put([FromBody] ContactOfficeHours config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactOfficeHoursService.CreateOrUpdateContactOfficeHoursAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating contact office hours");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> Delete()
        {
            try
            {
                var result = await _contactOfficeHoursService.DeleteContactOfficeHoursAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact office hours");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
