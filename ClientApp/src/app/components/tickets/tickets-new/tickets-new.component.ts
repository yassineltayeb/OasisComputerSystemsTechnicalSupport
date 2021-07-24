import { Component, OnInit } from '@angular/core';
import { KeyValuePairs } from 'src/app/models/KeyValuePairs';
import { StaffProfile } from 'src/app/models/StaffProfile';
import { SystemModule } from 'src/app/models/SystemModule';
import { StaffProfileService } from 'src/app/services/staff_profile/staff-profile.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-tickets-new',
  templateUrl: './tickets-new.component.html',
  styleUrls: ['./tickets-new.component.css']
})
export class TicketsNewComponent implements OnInit {

  ticketPriorities: KeyValuePairs[] = [];
  ticketsModules: SystemModule[] = [];
  accountManagers: StaffProfile[] = [];
  statusList: KeyValuePairs[] = [];
  typeList: KeyValuePairs[] = [];

  constructor(private ticketService: TicketService, private staffProfileService: StaffProfileService) { }

  ngOnInit(): void {
    // Get Ticket Priorities
    this.ticketService.getTicketPrioritiesList().subscribe((result: KeyValuePairs[]) => {
      this.ticketPriorities = result;
      console.log('this.ticketPriorities', this.ticketPriorities);
    });

    // Get Ticket Modules
    this.ticketService.getTicketsModules().subscribe((result: SystemModule[]) => {
      this.ticketsModules = result;
    });

    // Get Ticket Account Managers
    this.staffProfileService.getStaffProfilesList().subscribe((result: StaffProfile[]) => {
      this.accountManagers = result;
    });

    // Get Status List
    this.ticketService.getTicketStatusList().subscribe((result: KeyValuePairs[]) => {
      this.statusList = result;
    });

    // Get Type List
    this.ticketService.getTicketTypesList().subscribe((result: KeyValuePairs[]) => {
      this.typeList = result;
    });
  }

}
