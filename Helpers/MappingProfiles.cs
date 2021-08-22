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
            CreateMap<Support_TicketsToList, Support_TicketsDetails>();
            CreateMap<Support_Tickets_NoteToList, Support_Tickets_Note>();

            // //Dto to Model
            //Tickets
            CreateMap<Support_TicketsToRegister, Support_Ticket>();
            CreateMap<Support_TicketsDetails, Support_TicketsToList>();
            CreateMap<Support_Tickets_Note, Support_Tickets_NoteToList>();
        }
    }
}
