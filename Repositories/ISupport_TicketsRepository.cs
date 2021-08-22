using Oasis.TechnicalSupport.Web.Helpers;
using Oasis.TechnicalSupport.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Repositories
{
    public interface ISupport_TicketsRepository
    {
        Task<int> GenerateTicketNo(int clientId);
        Task<Support_TicketsToList> AddTicket(Support_TicketsToRegister ticket);
        Task<Support_Tickets_Note> AddTicketComment(int ticketID, string comment);
        Task<Support_TicketsToList> GetTicketById(int id);
        Task<PagedList<Support_TicketsToList>> GetTickets(Support_TicketsParameters support_TicketsParameters);
        Task<List<Support_Tickets_NoteToList>> GetTicketNotes(int ticketID);
        Task<List<Support_TicketsActiveTickets>> GetActiveTickets();
        Task<List<Support_TicketsActiveTicketsStatus>> GetTicketsStatus();
        Task<List<Support_TicketsActiveTicketsStatus>> GetActiveTicketsStatus();
        Task<List<KeyValuePairs>> GetTicketPrioritiesList();
        Task<List<KeyValuePairs>> GetTicketTypesList();
        Task<List<SystemModule>> GetTicketModulesList();
        Task<List<ClientModule>> GetTicketClientModulesList(int clientID);
        Task<List<KeyValuePairs>> GetTicketStatusList();
    }
}
