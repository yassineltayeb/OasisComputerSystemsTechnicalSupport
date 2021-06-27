using AutoMapper;
using Oasis.TechnicalSupport.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oasis.TechnicalSupport.Web.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // //Model to DTo
            //Tickets
            CreateMap<Support_Ticket, Support_TicketsToRegister>();

            // //Dto to Model
            //Tickets
            CreateMap<Support_TicketsToRegister, Support_Ticket>();
        }
    }
}
