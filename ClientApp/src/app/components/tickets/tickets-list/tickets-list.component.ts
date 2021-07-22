import { Component, OnInit } from '@angular/core';
import { KeyValuePairs } from 'src/app/models/KeyValuePairs';
import { StaffProfile } from 'src/app/models/StaffProfile';
import { SystemModule } from 'src/app/models/SystemModule';
import { TicketsParameters } from 'src/app/models/TicketsParameters';
import { StaffProfileService } from 'src/app/services/staff_profile/staff-profile.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

  ticketsModules: SystemModule[] = [];
  accountManagers: StaffProfile[] = [];
  statusList: KeyValuePairs[] = [];
  typeList: KeyValuePairs[] = [];
  ticketsParameters: TicketsParameters = {
    clientId: 0,
    fullName: null,
    module: [],
    accountManager: [],
    assignedTo: [],
    status: [],
    type: [],
    notApproved: false,
    highPriority: false,
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'type',
    IsSortAscending: true,
  };
  moduleSelectedValues = [];
  accountManagerSelectedValues = [];
  assignedToSelectedValues = [];
  statusSelectedValues = [];
  typeSelectedValues = [];

  constructor(private ticketService: TicketService, private staffProfileService: StaffProfileService) { }

  ngOnInit(): void {
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

    this.searchTickets();
  }

  // Get Tickets
  searchTickets(): void {
    this.ticketService.getTickets(this.ticketsParameters).subscribe(result => {
      console.log('Tickets', result);
    });
  }

}
