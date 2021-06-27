using System;
using System.ComponentModel.DataAnnotations;

namespace Oasis.TechnicalSupport.Web.Models
{
    public class StaffProfile
    {
        [Key]
        public long StaffID { get; set; }
        public string FullNameEn { get; set; }
        public string FullNameAr { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public string Pass { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? LastLoginOn { get; set; }

    }
}