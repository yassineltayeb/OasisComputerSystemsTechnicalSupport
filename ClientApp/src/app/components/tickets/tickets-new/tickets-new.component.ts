import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { KeyValuePairs } from 'src/app/models/KeyValuePairs';
import { StaffProfile } from 'src/app/models/StaffProfile';
import { SystemModule } from 'src/app/models/SystemModule';
import { ClientService } from 'src/app/services/client/client.service';
import { StaffProfileService } from 'src/app/services/staff_profile/staff-profile.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Ticket } from 'src/app/models/Ticket';
import { jsonToFormData, validateAllFormFields } from 'src/app/helpers/helpers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-tickets-new',
  templateUrl: './tickets-new.component.html',
  styleUrls: ['./tickets-new.component.css']
})
export class TicketsNewComponent implements OnInit {

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */

  ticketForm: FormGroup;
  ticketPriorities: KeyValuePairs[] = [];
  typeList: KeyValuePairs[] = [];
  accountManagers: StaffProfile[] = [];
  clients: Client[] = [];
  ticketsModules: SystemModule[] = [];
  statusList: KeyValuePairs[] = [];
  attachments: NzUploadFile[];
  isLoading = false;
  isLoadingModule = false;

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private ticketService: TicketService,
              private staffProfileService: StaffProfileService,
              private clientService: ClientService,
              private notification: NzNotificationService,
              private fb: FormBuilder) { }

  /* -------------------------------------------------------------------------- */
  /*                                  ngOnInit                                  */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initForm();
    this.getTicketPrioritiesList();
    this.getTicketTypesList();
    this.getStaffProfilesList();
    this.getClients();
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Initialize From ---------------------------- */
  initForm(): void {
    this.ticketForm = this.fb.group({
      assignedTo: [null],
      clientID: [null, [Validators.required]],
      type: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      module: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      problemDescription: [null, [Validators.required]],
      submittedBy: [null],
    });
  }

  /* -------------------------- Get Ticket Priorities ------------------------- */
  getTicketPrioritiesList(): void {
    this.ticketService.getTicketPrioritiesList().subscribe((result: KeyValuePairs[]) => {
      this.ticketPriorities = result;
    });
  }

  /* ------------------------------ Get Type List ----------------------------- */
  getTicketTypesList(): void {
    this.ticketService.getTicketTypesList().subscribe((result: KeyValuePairs[]) => {
      this.typeList = result;
    });
  }

  /* ----------------------- Get Ticket Account Managers ---------------------- */
  getStaffProfilesList(): void {
    this.staffProfileService.getStaffProfilesList().subscribe((result: StaffProfile[]) => {
      this.accountManagers = result;
    });
  }

  /* ------------------------------- Get Clients ------------------------------ */
  getClients(): void {
    this.clientService.getClients().subscribe((result: Client[]) => {
      this.clients = result;
    });
  }

  /* --------------------------- Get Client Modules --------------------------- */
  getClientModules(): void {
    this.isLoadingModule = true;

    if (this.ticketForm.controls.clientID.value != null) {
      this.ticketService.getTicketsClientModules(this.ticketForm.controls.clientID.value).subscribe((result: SystemModule[]) => {
        this.ticketsModules = result;
      });
    }

    this.isLoadingModule = false;
  }

  /* ------------------------------- Submit Form ------------------------------ */
  submitForm(ticket: Ticket): void {

    if (this.ticketForm.invalid) {
      validateAllFormFields(this.ticketForm);
      return;
    }

    this.isLoading = true;

    let formData = new FormData();

    formData = jsonToFormData(ticket);

    if (this.attachments != null) {
      this.attachments.forEach(item => {
        formData.append('attachments', item.originFileObj);
      });
    }

    this.ticketService.addTicket(formData).subscribe(
      result => {
        this.isLoading = false;
        this.clearForm();
        this.notification.success('Tickets', 'Saved successfully');
      }, err => {
        this.isLoading = false;
        this.notification.error('Login', 'Error when saving the ticket');
        console.log('message', err.message);
        console.log('error', err.error);
      });
  }

  /* ------------------------------ Upload Files ------------------------------ */
  handleChange({ file, fileList }: NzUploadChangeParam): void {
    this.attachments = fileList;
  }

  /* ------------------------------- Clear Form ------------------------------- */
  clearForm(): void {
    this.isLoading = false;
    this.ticketForm.reset();
    this.ticketForm.clearValidators();
    this.attachments = null;
  }

  /* ---------------------------- Delete Attachment --------------------------- */
  deleteAttachments(file: NzUploadFile): void {
    this.attachments.splice(this.attachments.indexOf(file), 1);
  }
}
