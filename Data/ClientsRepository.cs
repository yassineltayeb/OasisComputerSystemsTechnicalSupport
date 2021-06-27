using Microsoft.EntityFrameworkCore;
using Oasis.TechnicalSupport.Web.Models;
using Oasis.TechnicalSupport.Web.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Data
{
    public class ClientsRepository : IClientsRepository
    {
        private readonly IUnitOfWork unitOfWork;

        public ClientsRepository(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public Task<List<Client>> GetClients()
        {
            return unitOfWork.context.Clients.ToListAsync();
        }

        public Task<List<ClientModule>> GetClientModules(int clientId)
        {
            return unitOfWork.context.ClientsModules.Where(c => c.ClientID == clientId).ToListAsync();
        }
    }
}
