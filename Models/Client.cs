using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Models
{
    public class Client
    {
		[Key]
		public int SNo { get; set; }
		public string FullName { get; set; }
		public string FullNameAr { get; set; }
		public string AccountManager { get; set; }
		public string CreatedBy { get; set; }
		public DateTime CreatedOn { get; set; }
		public string UpdatedBy { get; set; }
		public DateTime? UpdatedOn { get; set; }
	}

	public class ClientModule
	{
		[Key]
		public int SNo { get; set; }
		public int ClientID { get; set; }
		public string Module { get; set; }
		public string Description { get; set; }
	}
}
