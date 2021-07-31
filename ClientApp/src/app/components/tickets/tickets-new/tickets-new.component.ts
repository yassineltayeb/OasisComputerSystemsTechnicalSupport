import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { KeyValuePairs } from 'src/app/models/KeyValuePairs';
import { StaffProfile } from 'src/app/models/StaffProfile';
import { SystemModule } from 'src/app/models/SystemModule';
import { ClientService } from 'src/app/services/client/client.service';
import { StaffProfileService } from 'src/app/services/staff_profile/staff-profile.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Ticket } from 'src/app/models/Ticket';
import { AuthService } from 'src/app/services/auth/auth.service';
import { jsonToFormData } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-tickets-new',
  templateUrl: './tickets-new.component.html',
  styleUrls: ['./tickets-new.component.css']
})
export class TicketsNewComponent implements OnInit {

  ticketPriorities: KeyValuePairs[] = [];
  typeList: KeyValuePairs[] = [];
  accountManagers: StaffProfile[] = [];
  clients: Client[] = [];
  ticketsModules: SystemModule[] = [];
  statusList: KeyValuePairs[] = [];
  ticket: Ticket = {
    assignedTo: '',
    clientID: 0,
    type: '',
    priority: '',
    module: '',
    subject: '',
    problemDescription: '',
    submittedBy: '',
    attachments: []
  };

  constructor(private authServie: AuthService,
              private ticketService: TicketService,
              private staffProfileService: StaffProfileService,
              private clientService: ClientService) { }

  ngOnInit(): void {
    // Get Ticket Priorities
    this.ticketService.getTicketPrioritiesList().subscribe((result: KeyValuePairs[]) => {
      this.ticketPriorities = result;
    });

    // Get Type List
    this.ticketService.getTicketTypesList().subscribe((result: KeyValuePairs[]) => {
      this.typeList = result;
    });

    // Get Ticket Account Managers
    this.staffProfileService.getStaffProfilesList().subscribe((result: StaffProfile[]) => {
      this.accountManagers = result;
    });

    // Get Clients
    this.clientService.getClients().subscribe((result: Client[]) => {
      this.clients = result;
    });

    // Get Ticket Modules
    this.ticketService.getTicketsModules().subscribe((result: SystemModule[]) => {
      this.ticketsModules = result;
    });

    // Get Status List
    this.ticketService.getTicketStatusList().subscribe((result: KeyValuePairs[]) => {
      this.statusList = result;
    });
  }

  submitForm(): void {
    let formData = new FormData();

    formData = jsonToFormData(this.ticket);

    this.ticket.attachments.forEach(item => {
      formData.append('attachments', item.originFileObj);
    });

    this.ticketService.addTicket(formData).subscribe(result => {
      console.log(result);
    });
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    this.ticket.attachments = fileList;
    console.log('attachments', this.ticket.attachments);
  }

}
