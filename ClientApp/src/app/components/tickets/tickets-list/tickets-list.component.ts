import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { KeyValuePairs } from 'src/app/models/KeyValuePairs';
import { Pagination } from 'src/app/models/Pagination';
import { StaffProfile } from 'src/app/models/StaffProfile';
import { SystemModule } from 'src/app/models/SystemModule';
import { TicketList } from 'src/app/models/TicketList';
import { TicketsParameters } from 'src/app/models/TicketsParameters';
import { TicketStatus } from 'src/app/models/TicketStatus';
import { TicketTypes } from 'src/app/models/TicketTypes';
import { StaffProfileService } from 'src/app/services/staff_profile/staff-profile.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})

/* -------------------------------------------------------------------------- */
/*                                Tickets List                                */
/* -------------------------------------------------------------------------- */

export class TicketsListComponent implements OnInit {

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  ticketList: TicketList[] = [];
  ticketsModules: SystemModule[] = [];
  accountManagers: StaffProfile[] = [];
  statusList: KeyValuePairs[] = [];
  typeList: KeyValuePairs[] = [];
  pagination: Pagination = {
    totalCount: 100,
    pageSize: 5,
    currentPage: 1,
    totalPages: 1,
    hasNext: true,
    hasPrevious: false
  };
  ticketsParameters: TicketsParameters = {
    clientId: 0,
    fullName: '',
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
  loading = true;
  expandSet = new Set<number>();

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(private ticketService: TicketService,
              private staffProfileService: StaffProfileService,
              private router: Router) { }

  /* -------------------------------------------------------------------------- */
  /*                                  ngOnInit                                  */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.getTicketsModules();
    this.getStaffProfilesList();
    this.getTicketStatusList();
    this.getTicketTypesList();

    // Initialize Ticket Status
    this.ticketsParameters.status.push(TicketStatus.WAITING);
    this.ticketsParameters.status.push(TicketStatus.REOPENED);
    this.ticketsParameters.status.push(TicketStatus.WORK_IN_PROGRESS);
    this.ticketsParameters.status.push(TicketStatus.PENDING_DELIVERY);
    this.ticketsParameters.status.push(TicketStatus.PENDING_ON_CUSTOMER);

    // Initialize Ticket Types
    this.ticketsParameters.type.push(TicketTypes.TECHNICAL_SUPPORT);
    this.ticketsParameters.type.push(TicketTypes.CHANGE_REQUEST);
    this.ticketsParameters.type.push(TicketTypes.SYSTEM_BUG);


    this.searchTickets();
  }

  /* --------------------------- Get Ticket Modules --------------------------- */
  getTicketsModules(): void {
    this.ticketService.getTicketsModules().subscribe((result: SystemModule[]) => {
      this.ticketsModules = result;
    });
  }

  /* ----------------------- Get Ticket Account Managers ---------------------- */
  getStaffProfilesList(): void {
    this.staffProfileService.getStaffProfilesList().subscribe((result: StaffProfile[]) => {
      this.accountManagers = result;
    });
  }

  /* ----------------------------- Get Status List ---------------------------- */
  getTicketStatusList(): void {
    this.ticketService.getTicketStatusList().subscribe((result: KeyValuePairs[]) => {
      this.statusList = result;
    });
  }

  /* ------------------------------ Get Type List ----------------------------- */
  getTicketTypesList(): void {
    this.ticketService.getTicketTypesList().subscribe((result: KeyValuePairs[]) => {
      this.typeList = result;
    });
  }

  /* ------------------------------- Get Tickets ------------------------------ */
  searchTickets(): void {
    this.loading = true;
    this.ticketService.getTickets(this.ticketsParameters).subscribe(result => {
      this.ticketList = result.body;
      this.pagination = result.headers.get('X-Pagination');
      console.log('ticketList', this.ticketList);
      console.log('pagination', this.pagination);
      this.loading = false;
    });
  }

  /* --------------------------- Show Ticket Details -------------------------- */
  showTicketDetails(ticketID): void {
    this.router.navigateByUrl('/tickets/details/' + ticketID);
  }

  /* --------------------------- Query Params Change -------------------------- */
  onQueryParamsChange(params: NzTableQueryParams): void {
    this.searchTickets();
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
}
