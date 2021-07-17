using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Oasis.TechnicalSupport.Web.Helpers;
using Oasis.TechnicalSupport.Web.Models;
using Oasis.TechnicalSupport.Web.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Data
{
    public class Support_TicketsRepository : ISupport_TicketsRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthRepository _authRepository;
        private readonly IMapper _mapper;

        public Support_TicketsRepository(IUnitOfWork unitOfWork, IAuthRepository authRepository, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            _authRepository = authRepository;
            _mapper = mapper;
        }

        // Generate Ticket No
        public async Task<int> GenerateTicketNo(int clientId)
        {
            var maxTicketNo = await _unitOfWork.context.VWSupport_Tickets
                                .Where(t => t.ClientID == clientId)
                                .OrderByDescending(x => x.TicketNo)
                                .Select(t => t.TicketNo)
                                .FirstOrDefaultAsync();

            if (maxTicketNo == 0)
                maxTicketNo = 1001;
            else
                maxTicketNo += 1;

            return maxTicketNo;
        }

        // Add New Ticket
        public async Task<Support_TicketsToList> AddTicket(Support_TicketsToRegister support_TicketsToRegister)
        {
            var currentUser = await _authRepository.GetCurrentUser();

            var ticketToAdd = _mapper.Map<Support_Ticket>(support_TicketsToRegister);

            ticketToAdd.TicketNo = await GenerateTicketNo(ticketToAdd.ClientID);
            ticketToAdd.Status = Support_TicketsHelper.Status.Waiting;
            ticketToAdd.SubmittedBy = currentUser.FullNameEn;
            ticketToAdd.SubmittedOn = DateTime.Now;

            var support_Tickets_Notes = new Support_Tickets_Note
            {
                TicketNo = ticketToAdd.SNo,
                Notes = "Ticket Opened " + Environment.NewLine + ticketToAdd.ProblemDescription,
                OasisComment = 1,
                SavedUser = currentUser.FullNameEn,
                SavedDate = DateTime.Now
            };

            ticketToAdd.Support_Tickets_Notes.Add(support_Tickets_Notes);

            await _unitOfWork.context.Support_Tickets.AddAsync(ticketToAdd);

            _unitOfWork.BeginTransaction();

            await _unitOfWork.SaveAll();

            if (support_TicketsToRegister.Attachments != null)
                Files.UploadFiles(ticketToAdd.SNo, support_TicketsToRegister.Attachments);

            await _unitOfWork.Commit();

            var ticketToRerurn = await GetTicketById(ticketToAdd.SNo);

            return ticketToRerurn;
        }

        // Get Ticket By ID
        public async Task<Support_TicketsToList> GetTicketById(int id)
        {
            return await _unitOfWork.context.VWSupport_Tickets.Where(s => s.SNo == id).FirstOrDefaultAsync();
        }

        // Get Active Tickets
        public Task<List<Support_TicketsActiveTickets>> GetActiveTickets()
        {
            return _unitOfWork.context.VWSupport_Tickets
                .Where(s => new[]
                    {
                        Support_TicketsHelper.Status.Waiting,
                        Support_TicketsHelper.Status.Reopened,
                        Support_TicketsHelper.Status.WorkInProgress,
                        Support_TicketsHelper.Status.PendingDelivery,
                        Support_TicketsHelper.Status.PendingOnCustomer
                    }.Contains(s.Status))
                .GroupBy(s => new { s.ClientID, s.FullName, s.AccountManager })
                .Select(s => new Support_TicketsActiveTickets
                {
                    ClientID = s.Key.ClientID,
                    FullName = s.Key.FullName,
                    NoOfTickets = s.Count(),
                    AccountManager = s.Key.AccountManager
                })
                .OrderByDescending(s => s.NoOfTickets)
                .ToListAsync();
        }


        // Get Tickets Status
        public Task<List<Support_TicketsActiveTicketsStatus>> GetTicketsStatus()
        {

            return _unitOfWork.context.VWSupport_Tickets
                  .GroupBy(s => new { s.Status })
                  .Select(s => new Support_TicketsActiveTicketsStatus
                  {
                      Status = s.Key.Status,
                      NoOfTickets = s.Count(),
                  })
                  .OrderByDescending(s => s.NoOfTickets)
                  .ToListAsync();
        }

        // Get Active Tickets Status
        public Task<List<Support_TicketsActiveTicketsStatus>> GetActiveTicketsStatus()
        {
            return _unitOfWork.context.VWSupport_Tickets
                .Where(s => new[]
                    {
                        Support_TicketsHelper.Status.Waiting,
                        Support_TicketsHelper.Status.Reopened,
                        Support_TicketsHelper.Status.WorkInProgress,
                        Support_TicketsHelper.Status.PendingDelivery,
                        Support_TicketsHelper.Status.PendingOnCustomer
                    }.Contains(s.Status))
                .GroupBy(s => new { s.Status })
                .Select(s => new Support_TicketsActiveTicketsStatus
                {
                    Status = s.Key.Status,
                    NoOfTickets = s.Count(),
                })
                .OrderByDescending(s => s.NoOfTickets)
                .ToListAsync();
        }

        // Get Tickets
        public async Task<List<Support_TicketsToList>> GetTickets(Support_TicketsParameters support_TicketsParameters)
        {
            var tickets = _unitOfWork.context.VWSupport_Tickets
                .OrderBy(t => t.TicketNo)
                .AsQueryable();

            // Filter By
            if (support_TicketsParameters.ClientId.HasValue)
                tickets = tickets.Where(s => s.ClientID == support_TicketsParameters.ClientId);

            if (support_TicketsParameters.FullName != null)
                tickets = tickets.Where(t => t.FullName.Contains(support_TicketsParameters.FullName));

            if (support_TicketsParameters.Module != null)
                tickets = tickets.Where(t => t.Module.Contains(support_TicketsParameters.Module));

            if (support_TicketsParameters.AccountManager != null)
                tickets = tickets.Where(t => t.AccountManager.Contains(support_TicketsParameters.AccountManager));

            if (support_TicketsParameters.AssignedTo != null)
                tickets = tickets.Where(t => t.AssignedTo.Contains(support_TicketsParameters.AssignedTo));

            if (support_TicketsParameters.NotApproved.HasValue)
                if (support_TicketsParameters.NotApproved == 1)
                    tickets = tickets.Where(t => t.ApprovedBy != null);

            if (support_TicketsParameters.HighPriority.HasValue)
                if (support_TicketsParameters.HighPriority == 1)
                    tickets = tickets.Where(t => t.HighPriority == support_TicketsParameters.HighPriority);

            if (support_TicketsParameters.Status != null)
                tickets = tickets.Where(t => support_TicketsParameters.Status.Contains(t.Status));

            if (support_TicketsParameters.Type != null)
                tickets = tickets.Where(t => support_TicketsParameters.Type.Contains(t.Type));

            return await tickets.ToListAsync();
        }

        // Get Ticket Priorities
        public IEnumerable<KeyValuePairs> GetTicketPrioritiesList()
        {
            var ticketPrioritiesList = new List<KeyValuePairs>
            {
                new KeyValuePairs { ID = 1, Name =  Support_TicketsHelper.Priority.High },
                new KeyValuePairs { ID = 2, Name =  Support_TicketsHelper.Priority.Normal },
                new KeyValuePairs { ID = 3, Name =  Support_TicketsHelper.Priority.Low }
            };

            return ticketPrioritiesList;
        }

        public IEnumerable<KeyValuePairs> GetTicketTypesList()
        {
            var ticketTypesList = new List<KeyValuePairs>
            {
                new KeyValuePairs { ID = 1, Name = Support_TicketsHelper.Type.TechnicalSupport },
                new KeyValuePairs { ID = 2, Name = Support_TicketsHelper.Type.ChangeRequest },
                new KeyValuePairs { ID = 3, Name = Support_TicketsHelper.Type.SystemBug }
            };

            return ticketTypesList;
        }

        public IEnumerable<KeyValuePairs> GetTicketStatusList()
        {
            var ticketStatusList = new List<KeyValuePairs>
            {
                new KeyValuePairs { ID = 1, Name =  Support_TicketsHelper.Status.Waiting },
                new KeyValuePairs { ID = 2, Name =  Support_TicketsHelper.Status.Reopened },
                new KeyValuePairs { ID = 3, Name =  Support_TicketsHelper.Status.WorkInProgress },
                new KeyValuePairs { ID = 4, Name =  Support_TicketsHelper.Status.PendingDelivery },
                new KeyValuePairs { ID = 5, Name =  Support_TicketsHelper.Status.PendingOnCustomer },
                new KeyValuePairs { ID = 6, Name =  Support_TicketsHelper.Status.Resolved },
                new KeyValuePairs { ID = 7, Name =  Support_TicketsHelper.Status.Canceled }
            };

            return ticketStatusList;
        }
    }
}
