using Dentriz.Configure.Api.Models;
using Dentriz.Configure.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Dentriz.Configure.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeNewPatientController : ControllerBase
    {
        private readonly IHomeNewPatientService _homeNewPatientService;

        public HomeNewPatientController(IHomeNewPatientService homeNewPatientService)
        {
            _homeNewPatientService = homeNewPatientService;
        }

        [HttpGet]
        public async Task<ActionResult<HomeNewPatient>> Get()
        {
            var newPatient = await _homeNewPatientService.GetHomeNewPatientAsync();
            return Ok(newPatient);
        }

        [HttpPost]
        public async Task<ActionResult<HomeNewPatient>> Post([FromBody] HomeNewPatient newPatient)
        {
            var createdNewPatient = await _homeNewPatientService.CreateOrUpdateHomeNewPatientAsync(newPatient);
            return CreatedAtAction(nameof(Get), new { id = createdNewPatient.Id }, createdNewPatient);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<HomeNewPatient>> Put(string id, [FromBody] HomeNewPatient newPatient)
        {
            if (id != newPatient.Id)
            {
                return BadRequest("ID mismatch");
            }
            var updatedNewPatient = await _homeNewPatientService.CreateOrUpdateHomeNewPatientAsync(newPatient);
            return Ok(updatedNewPatient);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _homeNewPatientService.DeleteHomeNewPatientAsync(id);
            return NoContent();
        }
    }
}
