using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Oasis.Support.API.Exceptions;
using Oasis.TechnicalSupport.Web.Contracts;
using Oasis.TechnicalSupport.Web.Models;
using Oasis.TechnicalSupport.Web.Repositories;

namespace Oasis.TechnicalSupport.Web.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IConfiguration config;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthRepository(IUnitOfWork unitOfWork, IConfiguration config, IHttpContextAccessor httpContextAccessor)
        {
            this.unitOfWork = unitOfWork;
            this.config = config;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<StaffProfile> GetCurrentUser()
        {
            var username = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name).Value;

            return await GetStaffByUsername(username);
        }

        public async Task<StaffProfile> GetStaffByUsername(string username)
        {
            return await unitOfWork.context.StaffProfiles.SingleOrDefaultAsync(u => u.Username == username);
        }

        public async Task<StaffProfile> GetStaffByID(int id)
        {
            return await unitOfWork.context.StaffProfiles.FirstOrDefaultAsync(u => u.StaffID == id);
        }
        public async Task<bool> UserExists(string username)
        {
            if (await unitOfWork.context.StaffProfiles.AnyAsync(u => u.Username == username))
                return true;
            return false;
        }

        public async Task<string> Login(UserLoginDto loginDto)
        {
            var username = loginDto.Username.ToLower();

            var staffProfile = await GetStaffByUsername(username);

            if (staffProfile == null || !(staffProfile.Pass == loginDto.Password)) throw new UnauthorizedActionException("Incorrect username or password");

            staffProfile.LastLoginOn = DateTime.Now;

            await unitOfWork.Commit();

            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier, staffProfile.StaffID.ToString()),
                new Claim(ClaimTypes.Name, staffProfile.FullNameEn),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Secret").Value));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }
    }
}