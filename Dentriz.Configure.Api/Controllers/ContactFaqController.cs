using Microsoft.AspNetCore.Mvc;
using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;

namespace Dentriz.Configure.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactFaqController : ControllerBase
    {
        private readonly IContactFaqService _contactFaqService;
        private readonly ILogger<ContactFaqController> _logger;

        public ContactFaqController(IContactFaqService contactFaqService, ILogger<ContactFaqController> logger)
        {
            _contactFaqService = contactFaqService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<ContactFaq>> Get()
        {
            try
            {
                var config = await _contactFaqService.GetContactFaqAsync();
                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting contact FAQ");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ContactFaq>> Post([FromBody] ContactFaq config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactFaqService.CreateOrUpdateContactFaqAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating or updating contact FAQ");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public async Task<ActionResult<ContactFaq>> Put([FromBody] ContactFaq config)
        {
            try
            {
                if (config == null)
                {
                    return BadRequest("Configuration cannot be null");
                }

                var result = await _contactFaqService.CreateOrUpdateContactFaqAsync(config);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating contact FAQ");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> Delete()
        {
            try
            {
                var result = await _contactFaqService.DeleteContactFaqAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact FAQ");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
