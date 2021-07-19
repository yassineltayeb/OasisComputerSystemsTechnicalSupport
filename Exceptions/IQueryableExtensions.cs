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
            if (support_TicketsParameters.ClientId.HasValue)
                query = query.Where(s => s.ClientID == support_TicketsParameters.ClientId);

            if (support_TicketsParameters.FullName != null)
                query = query.Where(t => t.FullName.Contains(support_TicketsParameters.FullName));

            if (support_TicketsParameters.Module != null)
                query = query.Where(t => t.Module.Contains(support_TicketsParameters.Module));

            if (support_TicketsParameters.AccountManager != null)
                query = query.Where(t => t.AccountManager.Contains(support_TicketsParameters.AccountManager));

            if (support_TicketsParameters.AssignedTo != null)
                query = query.Where(t => t.AssignedTo.Contains(support_TicketsParameters.AssignedTo));

            if (support_TicketsParameters.NotApproved.HasValue)
                if (support_TicketsParameters.NotApproved == 1)
                    query = query.Where(t => t.ApprovedBy != null);

            if (support_TicketsParameters.HighPriority.HasValue)
                if (support_TicketsParameters.HighPriority == 1)
                    query = query.Where(t => t.HighPriority == support_TicketsParameters.HighPriority);

            if (support_TicketsParameters.Status != null)
                query = query.Where(t => support_TicketsParameters.Status.Contains(t.Status));

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
