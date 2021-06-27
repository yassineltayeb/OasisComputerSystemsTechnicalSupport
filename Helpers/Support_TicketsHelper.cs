using Oasis.TechnicalSupport.Web.Models;
using System.Collections.Generic;

namespace Oasis.TechnicalSupport.Web.Helpers
{
    public class Support_TicketsHelper
    {
        public class Priority
        {
            public static readonly string High = "High";
            public static readonly string Normal = "Normal";
            public static readonly string Low = "Low";
        }

        public class Type
        {
            public static readonly string TechnicalSupport = "Technical Support";
            public static readonly string ChangeRequest = "Change Request";
            public static readonly string SystemBug = "System Bug";
        }

        public class Status
        {
            public static readonly string Waiting = "Waiting";
            public static readonly string Reopened = "Reopened";
            public static readonly string WorkInProgress = "Work In Progress";
            public static readonly string PendingDelivery = "Pending Delivery";
            public static readonly string PendingOnCustomer = "Pending On Customer";
            public static readonly string Resolved = "Resolved";
            public static readonly string Canceled = "Canceled";
        }
    }
}
