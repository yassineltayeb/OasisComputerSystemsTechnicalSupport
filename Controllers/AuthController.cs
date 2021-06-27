using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oasis.TechnicalSupport.Web.Contracts;
using Oasis.TechnicalSupport.Web.Repositories;

namespace Oasis.TechnicalSupport.Web.Controllers
{
    [Authorize]
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            this.authRepository = authRepository;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto loginDto)
        {
            var userToken = await authRepository.Login(loginDto);
            var staffProfile = await authRepository.GetStaffByUsername(loginDto.Username.ToLower());

            return Ok(new
            {
                fullName = staffProfile.FullNameEn,
                username = staffProfile.Username,
                token = userToken
            });
        }
    }
}