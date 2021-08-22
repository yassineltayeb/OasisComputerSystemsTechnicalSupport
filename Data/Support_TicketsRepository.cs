using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Oasis.TechnicalSupport.Web.Exceptions;
using Oasis.TechnicalSupport.Web.Helpers;
using Oasis.TechnicalSupport.Web.Models;
using Oasis.TechnicalSupport.Web.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Data
{
    /* -------------------------------------------------------------------------- */
    /*                         Support_Tickets Repository                         */
    /* -------------------------------------------------------------------------- */
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

        /* --------------------------- Generate Ticket No --------------------------- */
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

        /* ----------------------------- Add New Ticket ----------------------------- */
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

            var ticketToReturn = await GetTicketById(ticketToAdd.SNo);

            return ticketToReturn;
        }

        /* --------------------------- Add Ticket Comment --------------------------- */
        public async Task<Support_Tickets_Note> AddTicketComment(int ticketID, string comment)
        {
            var currentUser = await _authRepository.GetCurrentUser();

            var support_Tickets_Notes = new Support_Tickets_Note
            {
                TicketNo = ticketID,
                Notes = comment,
                OasisComment = 1,
                SavedUser = currentUser.FullNameEn,
                SavedDate = DateTime.Now
            };

            await _unitOfWork.context.Support_Tickets_Notes.AddAsync(support_Tickets_Notes);

            _unitOfWork.BeginTransaction();

            await _unitOfWork.SaveAll();

            await _unitOfWork.Commit();

            var ticketToReturn = support_Tickets_Notes;

            return ticketToReturn;
        }

        /* ---------------------------- Get Ticket By ID ---------------------------- */
        public async Task<Support_TicketsToList> GetTicketById(int id)
        {
            return await _unitOfWork.context.VWSupport_Tickets.Where(s => s.SNo == id).FirstOrDefaultAsync();
        }

         /* ---------------------------- Get Ticket Notes ---------------------------- */
        public async Task<List<Support_Tickets_NoteToList>> GetTicketNotes(int ticketID)
        {
            var ticketNotes = await _unitOfWork.context.Support_Tickets_Notes.Where(s => s.TicketNo == ticketID).ToListAsync();
            
            return _mapper.Map<List<Support_Tickets_NoteToList>>(ticketNotes);
        }

        /* --------------------------- Get Active Tickets --------------------------- */
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


        /* --------------------------- Get Tickets Status --------------------------- */
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

        /* ------------------------ Get Active Tickets Status ----------------------- */
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

        /* ------------------------------- Get Tickets ------------------------------ */
        public async Task<PagedList<Support_TicketsToList>> GetTickets(Support_TicketsParameters support_TicketsParameters)
        {
            var tickets = _unitOfWork.context.VWSupport_Tickets
                .OrderBy(t => t.TicketNo)
                .AsQueryable();

            /* -------------------------------- Filtering ------------------------------- */
            tickets = tickets.ApplyFiltering(support_TicketsParameters);

            /* --------------------------------- Sorting -------------------------------- */
            var columnsMap = new Dictionary<string, Expression<Func<Support_TicketsToList, object>>>()
            {
                ["sNo"] = p => p.SNo,
                ["assignedTo"] = p => p.AssignedTo,
                ["clientID"] = p => p.ClientID,
                ["fullName"] = p => p.FullName,
                ["accountManager"] = p => p.AccountManager,
                ["ticketNo"] = p => p.TicketNo,
                ["type"] = p => p.Type,
                ["category"] = p => p.Category,
                ["status"] = p => p.Status,
                ["highPriority"] = p => p.HighPriority,
                ["priority"] = p => p.Priority,
                ["source"] = p => p.Source,
                ["module"] = p => p.Module,
                ["subject"] = p => p.Subject,
                ["problemDescription"] = p => p.ProblemDescription,
                ["reminders"] = p => p.Reminders,
                ["submittedBy"] = p => p.SubmittedBy,
                ["submittedOn"] = p => p.SubmittedOn,
                ["oasisComments"] = p => p.OasisComments,
                ["closedBy"] = p => p.ClosedBy,
                ["closedOn"] = p => p.ClosedOn,
                ["approvedBy"] = p => p.ApprovedBy,
                ["approvedOn"] = p => p.ApprovedOn
            };

            tickets = tickets.ApplyOrdering(support_TicketsParameters, columnsMap);

            return await PagedList<Support_TicketsToList>.ToPagedListAsync(tickets, support_TicketsParameters.PageNumber, support_TicketsParameters.PageSize);
        }

        /* -------------------------- Get Ticket Priorities ------------------------- */
        public async Task<List<KeyValuePairs>> GetTicketPrioritiesList()
        {
            var ticketPrioritiesList = new List<KeyValuePairs>
            {
                new KeyValuePairs { ID = 1, Name =  Support_TicketsHelper.Priority.High },
                new KeyValuePairs { ID = 2, Name =  Support_TicketsHelper.Priority.Normal },
                new KeyValuePairs { ID = 3, Name =  Support_TicketsHelper.Priority.Low }
            };

            return await Task.Run(() => ticketPrioritiesList);
        }

        /* -------------------------- Get Ticket Types List ------------------------- */
        public async Task<List<KeyValuePairs>> GetTicketTypesList()
        {
            var ticketTypesList = new List<KeyValuePairs>
            {
                new KeyValuePairs { ID = 1, Name = Support_TicketsHelper.Type.TechnicalSupport },
                new KeyValuePairs { ID = 2, Name = Support_TicketsHelper.Type.ChangeRequest },
                new KeyValuePairs { ID = 3, Name = Support_TicketsHelper.Type.SystemBug }
            };

            return await Task.Run(() => ticketTypesList);
        }

        /* ------------------------- Get Ticket Modules List ------------------------ */
        public async Task<List<SystemModule>> GetTicketModulesList()
        {
            return await _unitOfWork.context.SystemsModules.ToListAsync(); ;
        }

        /* --------------------- Get Ticket Client Modules List --------------------- */
        public async Task<List<ClientModule>> GetTicketClientModulesList(int clientID)
        {
            return await _unitOfWork.context.ClientsModules.Where(c => c.ClientID == clientID).ToListAsync(); ;
        }

        /* ------------------------- Get Ticket Status List ------------------------- */
        public async Task<List<KeyValuePairs>> GetTicketStatusList()
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

            return await Task.Run(() => ticketStatusList);
        }
    }
}
