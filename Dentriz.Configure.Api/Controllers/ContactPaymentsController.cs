using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactPaymentsController : ControllerBase
    {
        private readonly IContactPaymentsService _contactPaymentsService;
        private readonly ILogger<ContactPaymentsController> _logger;

        public ContactPaymentsController(IContactPaymentsService contactPaymentsService, ILogger<ContactPaymentsController> logger)
        {
            _contactPaymentsService = contactPaymentsService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<ContactPayments>> Get()
        {
            try
            {
                var config = await _contactPaymentsService.GetContactPaymentsAsync();
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact payments");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ContactPayments>> Post([FromBody] ContactPayments config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactPaymentsService.CreateOrUpdateContactPaymentsAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact payments");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public async Task<ActionResult<ContactPayments>> Put([FromBody] ContactPayments config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactPaymentsService.CreateOrUpdateContactPaymentsAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating contact payments");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> Delete()
        {
            try
            {
                var result = await _contactPaymentsService.DeleteContactPaymentsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact payments");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
