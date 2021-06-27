using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oasis.TechnicalSupport.Web.Models;
using Oasis.TechnicalSupport.Web.Repositories;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Controllers
{
    [Authorize]
    [Route("api/staffprofiles")]
    [ApiController]
    public class StaffProfilesController : ControllerBase
    {
        private readonly IStaffProfilesRepository staffProfilesRepository;

        public StaffProfilesController(IStaffProfilesRepository staffProfilesRepository)
        {
            this.staffProfilesRepository = staffProfilesRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetStaffProfiles()
        {
            var clients = await staffProfilesRepository.GetStaffProfiles();

            return Ok(clients);
        }
    }
}
