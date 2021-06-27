using Microsoft.EntityFrameworkCore.Storage;
using Oasis.TechnicalSupport.Web.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        public DataContext context { get; }

        private IDbContextTransaction _transaction;

        public UnitOfWork(DataContext context)
        {
            this.context = context;
        }

        public async void BeginTransaction()
        {
            _transaction = await context.Database.BeginTransactionAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public async Task Commit()
        {
            await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
