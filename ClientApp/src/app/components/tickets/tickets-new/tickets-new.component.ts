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

    // for (const property of Object.keys(this.ticket)) {
    //   console.log('property', property);
    //   console.log('value', this.ticket[property]);
    //   formData.append(property, this.ticket[property]);
    // }
    formData.append('assignedTo', this.ticket.assignedTo);
    formData.append('clientID', this.ticket.clientID.toString());
    formData.append('type', this.ticket.type);
    formData.append('priority', this.ticket.priority);
    formData.append('module', this.ticket.module);
    formData.append('subject', this.ticket.subject);
    formData.append('problemDescription', this.ticket.problemDescription);
    formData.append('submittedBy', this.ticket.submittedBy);
    // formData = this.jsonToFormData(this.ticket);

    this.ticket.attachments.forEach(item => {
      formData.append('attachments', item.originFileObj);
      console.log('item', item);
   });

    this.ticketService.addTicket(formData).subscribe(result => {
      console.log(result);
    });
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    this.ticket.attachments = fileList;
    console.log('attachments', this.ticket.attachments);
  }

  // tslint:disable-next-line:typedef
  buildFormData(formData, data, parentKey) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;

      formData.append(parentKey, value);
    }
  }

  // tslint:disable-next-line:typedef
  jsonToFormData(data) {
    const formData = new FormData();

    this.buildFormData(formData, data, null);

    return formData;
  }

}
