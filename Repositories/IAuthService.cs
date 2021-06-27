using System.Threading.Tasks;
using Oasis.TechnicalSupport.Web.Contracts;
using Oasis.TechnicalSupport.Web.Models;

namespace Oasis.TechnicalSupport.Web.Repositories
{
    public interface IAuthRepository
    {
        Task<StaffProfile> GetCurrentUser();
        Task<StaffProfile> GetStaffByUsername(string username);
        Task<StaffProfile> GetStaffByID(int id);
        Task<string> Login(UserLoginDto loginDto);

    }
}