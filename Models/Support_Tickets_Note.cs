using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Models
{
    public class Support_Tickets_Note
    {
		[Key]
		public long SNo { get; set; }
		[ForeignKey("Support_Ticket")]
		public int TicketNo { get; set; }
        public virtual Support_Ticket Support_Ticket { get; set; }
        public string Notes { get; set; }
		public bool IsRead { get; set; }
		public DateTime SavedDate { get; set; }
		public string SavedUser { get; set; }
		public int OasisComment { get; set; }
	}
}
