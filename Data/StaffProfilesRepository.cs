using Microsoft.EntityFrameworkCore;
using Oasis.TechnicalSupport.Web.Models;
using Oasis.TechnicalSupport.Web.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Data
{
    public class StaffProfilesRepository : IStaffProfilesRepository
    {
        private readonly IUnitOfWork unitOfWork;

        public StaffProfilesRepository(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public Task<List<StaffProfile>> GetStaffProfiles()
        {
            return unitOfWork.context.StaffProfiles.ToListAsync();
        }
    }
}
