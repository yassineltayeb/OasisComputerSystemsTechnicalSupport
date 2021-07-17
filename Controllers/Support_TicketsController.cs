using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oasis.TechnicalSupport.Web.Models;
using Oasis.TechnicalSupport.Web.Repositories;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Controllers
{
    [Authorize]
    [Route("api/tickets")]
    [ApiController]
    public class Support_TicketsController : ControllerBase
    {
        private readonly ISupport_TicketsRepository support_TicketsRepository;

        public Support_TicketsController(ISupport_TicketsRepository support_TicketsRepository)
        {
            this.support_TicketsRepository = support_TicketsRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddTicket(Support_TicketsToRegister ticketToAdd)
        {

            var ticket = await support_TicketsRepository.AddTicket(ticketToAdd);

            return Ok(ticket);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicketById(int id)
        {
            var ticket = await support_TicketsRepository.GetTicketById(id);

            return Ok(ticket);
        }


        [HttpGet("activetickets")]
        public async Task<IActionResult> GetActiveTickets()
        {
            var activeTickets = await support_TicketsRepository.GetActiveTickets();

            return Ok(activeTickets);
        }

        [HttpGet("ticketsstatus")]
        public async Task<IActionResult> GetTicketsStatus()
        {
            var activeTickets = await support_TicketsRepository.GetTicketsStatus();

            return Ok(activeTickets);
        }

        [HttpGet("activeticketsstatus")]
        public async Task<IActionResult> GetActiveTicketsStatus()
        {
            var activeTickets = await support_TicketsRepository.GetActiveTicketsStatus();

            return Ok(activeTickets);
        }

        [HttpGet]
        public async Task<IActionResult> GetTickets(Support_TicketsParameters support_TicketsParameters)
        {
            var tickets = await support_TicketsRepository.GetTickets(support_TicketsParameters);

            return Ok(tickets);
        }

        [HttpGet("ticketprioritieslist")]
        public IActionResult GetTicketPrioritiesList()
        {
            var ticketPriorities = support_TicketsRepository.GetTicketPrioritiesList();

            return Ok(ticketPriorities);
        }

        [HttpGet("tickettypeslist")]
        public IActionResult GetTicketTypesList()
        {
            var ticketTypes = support_TicketsRepository.GetTicketTypesList();

            return Ok(ticketTypes);
        }

        [HttpGet("ticketstatuslist")]
        public IActionResult GetTicketStatusList()
        {
            var ticketStatuses = support_TicketsRepository.GetTicketStatusList();

            return Ok(ticketStatuses);
        }
    }
}
