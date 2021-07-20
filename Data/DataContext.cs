using Microsoft.EntityFrameworkCore;
using Oasis.TechnicalSupport.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Support_TicketsToList> VWSupport_Tickets { get; set; }
        public DbSet<Support_Ticket> Support_Tickets { get; set; }
        public DbSet<Support_Tickets_Note> Support_Tickets_Notes { get; set; }
        public DbSet<StaffProfile> StaffProfiles { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<ClientModule> ClientsModules { get; set; }
        public DbSet<SystemModule> SystemsModules { get; set; }

    }
}
