using Oasis.TechnicalSupport.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Repositories
{
    public interface IStaffProfilesRepository
    {
        Task<List<StaffProfile>> GetStaffProfiles();
    }
}
