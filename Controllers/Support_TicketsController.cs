using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Oasis.TechnicalSupport.Web.Helpers;
using Oasis.TechnicalSupport.Web.Models;
using Oasis.TechnicalSupport.Web.Repositories;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Controllers
{
    /* -------------------------------------------------------------------------- */
    /*                         Support_Tickets Controller                         */
    /* -------------------------------------------------------------------------- */
    [Authorize]
    [Route("api/tickets")]
    [ApiController]
    public class Support_TicketsController : ControllerBase
    {
        /* -------------------------------------------------------------------------- */
        /*                                  Variables                                 */
        /* -------------------------------------------------------------------------- */
        private readonly ISupport_TicketsRepository support_TicketsRepository;
        private readonly IMapper _mapper;


        /* -------------------------------------------------------------------------- */
        /*                                  Functions                                 */
        /* -------------------------------------------------------------------------- */
        
        /* ------------------------------- Constructor ------------------------------ */
        public Support_TicketsController(ISupport_TicketsRepository support_TicketsRepository, IMapper mapper)
        {
            this.support_TicketsRepository = support_TicketsRepository;
            _mapper = mapper;
        }

        /* ----------------------------- Add New Ticket ----------------------------- */
        [HttpPost]
        public async Task<IActionResult> AddTicket([FromForm] Support_TicketsToRegister ticketToAdd)
        {

            var ticket = await support_TicketsRepository.AddTicket(ticketToAdd);

            return Ok(ticket);
        }

        /* ---------------------------- Get Ticket By Id ---------------------------- */
        [HttpGet("{ticketID}")]
        public async Task<IActionResult> GetTicketById(int ticketID)
        {
            var ticket = await support_TicketsRepository.GetTicketById(ticketID);
            var ticketDetails = _mapper.Map<Support_TicketsDetails>(ticket);
            ticketDetails.Attachments = await Files.DownloadFiles(ticket.SNo);

            return Ok(ticketDetails);
        }

        /* --------------------------- Get Active Tickets --------------------------- */
        [HttpGet("activetickets")]
        public async Task<IActionResult> GetActiveTickets()
        {
            var activeTickets = await support_TicketsRepository.GetActiveTickets();

            return Ok(activeTickets);
        }

        /* --------------------------- Get Tickets Status --------------------------- */
        [HttpGet("ticketsstatus")]
        public async Task<IActionResult> GetTicketsStatus()
        {
            var activeTickets = await support_TicketsRepository.GetTicketsStatus();

            return Ok(activeTickets);
        }

        /* ------------------------ Get Active Tickets Status ----------------------- */
        [HttpGet("activeticketsstatus")]
        public async Task<IActionResult> GetActiveTicketsStatus()
        {
            var activeTickets = await support_TicketsRepository.GetActiveTicketsStatus();

            return Ok(activeTickets);
        }

        /* ---------------------------- Get Tickets List ---------------------------- */
        [HttpGet("ticketslist")]
        public async Task<IActionResult> GetTicketsList([FromQuery] Support_TicketsParameters support_TicketsParameters)
        {
            var tickets = await support_TicketsRepository.GetTickets(support_TicketsParameters);

            var metadata = new
            {
                totalCount = tickets.TotalCount,
                pageSize = tickets.PageSize,
                currentPage = tickets.CurrentPage,
                totalPages = tickets.TotalPages,
                hasNext = tickets.HasNext,
                hasPrevious = tickets.HasPrevious
            };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

            return Ok(tickets);
        }

        /* ----------------------- Get Ticket Priorities List ----------------------- */
        [HttpGet("ticketprioritieslist")]
        public async Task<IActionResult> GetTicketPrioritiesList()
        {
            var ticketPriorities = await support_TicketsRepository.GetTicketPrioritiesList();

            return Ok(ticketPriorities);
        }

        /* -------------------------- Get Ticket Types List ------------------------- */
        [HttpGet("tickettypeslist")]
        public async Task<IActionResult> GetTicketTypesList()
        {
            var ticketTypes = await support_TicketsRepository.GetTicketTypesList();

            return Ok(ticketTypes);
        }

        /* ------------------------- Get Ticket Modules List ------------------------ */
        [HttpGet("ticketmoduleslist")]
        public async Task<IActionResult> GetTicketModulesList(int clientID)
        {
            var ticketModules = await support_TicketsRepository.GetTicketClientModulesList(clientID);

            return Ok(ticketModules);
        }

        /* --------------------- Get Ticket Client Modules List --------------------- */
        [HttpGet("ticketclientmoduleslist/{clientID}")]
        public async Task<IActionResult> GetTicketClientModulesList(int clientID)
        {
            var ticketModules = await support_TicketsRepository.GetTicketClientModulesList(clientID);

            return Ok(ticketModules);
        }

        /* ------------------------- Get Ticket Status List ------------------------- */
        [HttpGet("ticketstatuslist")]
        public async Task<IActionResult> GetTicketStatusList()
        {
            var ticketStatuses = await support_TicketsRepository.GetTicketStatusList();

            return Ok(ticketStatuses);
        }
    }
}
