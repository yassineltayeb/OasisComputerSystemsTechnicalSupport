using Oasis.TechnicalSupport.Web.Helpers;
using Oasis.TechnicalSupport.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Oasis.TechnicalSupport.Web.Exceptions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<Support_TicketsToList> ApplyFiltering(this IQueryable<Support_TicketsToList> query, Support_TicketsParameters support_TicketsParameters)
        {
            // Client ID
            if (support_TicketsParameters.ClientId.HasValue)
                if (support_TicketsParameters.ClientId != 0)
                    query = query.Where(s => s.ClientID == support_TicketsParameters.ClientId);

            // Client Name
            if (support_TicketsParameters.FullName != null)
                query = query.Where(t => t.FullName.Contains(support_TicketsParameters.FullName));

            // Module
            if (support_TicketsParameters.Module != null)
                query = query.Where(t => support_TicketsParameters.Module.Contains(t.Module));

            // Account Manager
            if (support_TicketsParameters.AccountManager != null)
                query = query.Where(t => support_TicketsParameters.AccountManager.Contains(t.AccountManager));

            // Assigned To
            if (support_TicketsParameters.AssignedTo != null)
                query = query.Where(t => support_TicketsParameters.AssignedTo.Contains(t.AssignedTo));

            // Not Approved
            if (support_TicketsParameters.NotApproved.HasValue)
                if (support_TicketsParameters.NotApproved == true)
                    query = query.Where(t => t.ApprovedBy != null);

            // High Priority
            if (support_TicketsParameters.HighPriority.HasValue)
                if (support_TicketsParameters.HighPriority == true)
                    query = query.Where(t => t.HighPriority == 1);
            // Status
            if (support_TicketsParameters.Status != null)
                query = query.Where(t => support_TicketsParameters.Status.Contains(t.Status));

            // Type
            if (support_TicketsParameters.Type != null)
                query = query.Where(t => support_TicketsParameters.Type.Contains(t.Type));

            return query;
        }

        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, QueryStringParameters queryObj, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (String.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMap.ContainsKey(queryObj.SortBy))
                return query;

            if (queryObj.IsSortAscending)
                return query.OrderBy(columnsMap[queryObj.SortBy]);
            else
                return query.OrderByDescending(columnsMap[queryObj.SortBy]);
        }
    }
}
