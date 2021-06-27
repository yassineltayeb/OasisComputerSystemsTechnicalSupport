using Oasis.TechnicalSupport.Web.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Repositories
{
    public interface IUnitOfWork
    {
        DataContext context { get; }

        void BeginTransaction();

        Task<bool> SaveAll();

        Task Commit();
    }
}
