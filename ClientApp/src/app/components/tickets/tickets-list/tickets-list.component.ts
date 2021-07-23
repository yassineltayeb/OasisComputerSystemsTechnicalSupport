import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { KeyValuePairs } from 'src/app/models/KeyValuePairs';
import { Pagination } from 'src/app/models/Pagination';
import { StaffProfile } from 'src/app/models/StaffProfile';
import { SystemModule } from 'src/app/models/SystemModule';
import { TicketList } from 'src/app/models/TicketList';
import { TicketsParameters } from 'src/app/models/TicketsParameters';
import { StaffProfileService } from 'src/app/services/staff_profile/staff-profile.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

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
  moduleSelectedValues = [];
  accountManagerSelectedValues = [];
  assignedToSelectedValues = [];
  statusSelectedValues = [];
  typeSelectedValues = [];
  loading = true;

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
    // this.ticketService.getTickets(this.ticketsParameters).subscribe((result: TicketList[]) => {
    //   this.ticketList = result;
    //   console.log('Tickets', this.ticketList);
    // });
    this.loading = true;
    this.ticketService.getTickets(this.ticketsParameters).subscribe(result => {
      this.ticketList = result.body;
      this.pagination = result.headers.get('X-Pagination');
      console.log('ticketList', this.ticketList);
      console.log('pagination', this.pagination);
      this.loading = false;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.searchTickets();
  }
}
