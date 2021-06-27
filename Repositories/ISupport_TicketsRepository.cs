using Oasis.TechnicalSupport.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Repositories
{
    public interface ISupport_TicketsRepository
    {
        Task<int> GenerateTicketNo(int clientId);
        Task<Support_TicketsToList> AddTicket(Support_TicketsToRegister ticket);
        Task<Support_TicketsToList> GetTicketById(int id);
        Task<List<Support_TicketsToList>> GetTickets(Support_TicketsParameters support_TicketsParameters);
        Task<List<Support_TicketsActiveTickets>> GetActiveTickets();
        IEnumerable<KeyValuePairs> GetTicketPrioritiesList();
        IEnumerable<KeyValuePairs> GetTicketTypesList();
        IEnumerable<KeyValuePairs> GetTicketStatusList();
    }
}
