using Microsoft.AspNetCore.Http;
using Oasis.TechnicalSupport.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Oasis.TechnicalSupport.Web.Models
{

    public class Support_Ticket
    {
        [Key]
        public int SNo { get; set; }
        public string AssignedTo { get; set; }
        public int ClientID { get; set; }
        public int TicketNo { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public int HighPriority { get; set; }
        public string Priority { get; set; }
        public string Source { get; set; }
        public string Module { get; set; }
        public string Subject { get; set; }
        public string ProblemDescription { get; set; }
        public int Reminders { get; set; }
        public string SubmittedBy { get; set; }
        public DateTime SubmittedOn { get; set; }
        public string OasisComments { get; set; }
        public string ClosedBy { get; set; }
        public DateTime? ClosedOn { get; set; }
        public string ApprovedBy { get; set; }
        public DateTime? ApprovedOn { get; set; }

        public ICollection<Support_Tickets_Note> Support_Tickets_Notes { get; set; }

        public Support_Ticket()
        {
            Support_Tickets_Notes = new Collection<Support_Tickets_Note>();
        }
    }

    public class Support_TicketsToRegister
    {
        [Key]
        public int SNo { get; set; }
        public string AssignedTo { get; set; }
        public int ClientID { get; set; }
        public int TicketNo { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public int HighPriority { get; set; }
        public string Priority { get; set; }
        public string Source { get; set; }
        public string Module { get; set; }
        public string Subject { get; set; }
        public string ProblemDescription { get; set; }
        public int Reminders { get; set; }
        public string SubmittedBy { get; set; }
        public DateTime SubmittedOn { get; set; }
        public string OasisComments { get; set; }
        public string ClosedBy { get; set; }
        public DateTime? ClosedOn { get; set; }
        public string ApprovedBy { get; set; }
        public DateTime? ApprovedOn { get; set; }

        public ICollection<Support_Tickets_Note> Support_Tickets_Notes { get; set; }
        public List<IFormFile> Attachments { get; set; }

        public Support_TicketsToRegister()
        {
            Support_Tickets_Notes = new Collection<Support_Tickets_Note>();
        }
    }

    public class Support_TicketsToList
    {
        [Key]
        public int SNo { get; set; }
        public string AssignedTo { get; set; }
        public int ClientID { get; set; }
        public string FullName { get; set; }
        public string AccountManager { get; set; }
        public int TicketNo { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public int HighPriority { get; set; }
        public string Priority { get; set; }
        public string Source { get; set; }
        public string Module { get; set; }
        public string Subject { get; set; }
        public string ProblemDescription { get; set; }
        public int Reminders { get; set; }
        public string SubmittedBy { get; set; }
        public DateTime SubmittedOn { get; set; }
        public string OasisComments { get; set; }
        public string ClosedBy { get; set; }
        public DateTime? ClosedOn { get; set; }
        public string ApprovedBy { get; set; }
        public DateTime? ApprovedOn { get; set; }
    }

    public class Support_TicketsActiveTickets
    {
        public int ClientID { get; set; }
        public string FullName { get; set; }
        public int NoOfTickets { get; set; }
        public string AccountManager { get; set; }
    }

    public class Support_TicketsActiveTicketsStatus
    {
        public string Status { get; set; }
        public int NoOfTickets { get; set; }
    }

    public class Support_TicketsParameters : QueryStringParameters
    {
        public int? ClientId { get; set; }
        public string FullName { get; set; }
        public string Module { get; set; }
        public string AccountManager { get; set; }
        public string AssignedTo { get; set; }
        public int? NotApproved { get; set; }
        public int? HighPriority { get; set; }
        public string[] Status { get; set; }
        public string[] Type { get; set; }
    }
}
