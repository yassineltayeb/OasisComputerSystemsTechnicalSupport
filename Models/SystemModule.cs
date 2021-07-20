using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Models
{
    public class SystemModule
    {
        [Key]
        public int SNo { get; set; }
        public string Module { get; set; }
        public string Description { get; set; }
    }
}
