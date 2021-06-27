using Oasis.TechnicalSupport.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Repositories
{
    public interface IClientsRepository
    {
        Task<List<Client>> GetClients();
        Task<List<ClientModule>> GetClientModules(int clientId);
    }
}
