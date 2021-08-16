import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { dateDiff } from 'src/app/helpers/helpers';
import { FileModel } from 'src/app/models/FileModel';
import { TicketDetails } from 'src/app/models/TicketDetails';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-tickets-viewer',
  templateUrl: './tickets-viewer.component.html',
  styleUrls: ['./tickets-viewer.component.css']
})

/* -------------------------------------------------------------------------- */
/*                               Tickets Viewer                               */
/* -------------------------------------------------------------------------- */

export class TicketsViewerComponent implements OnInit {

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */

  ticket: TicketDetails;

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private ticketService: TicketService, private route: ActivatedRoute) { }

  /* -------------------------------------------------------------------------- */
  /*                                  ngOnInit                                  */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.getTicketIDFromQueryParam().subscribe(params => {
      this.getTicketByID(params.ticketID);
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  /* --------------------- Get Ticket ID From QueryParams --------------------- */
  getTicketIDFromQueryParam(): Observable<Params> {
    return this.route.params;
  }

  /* ---------------------------- Get Ticket By ID ---------------------------- */
  getTicketByID(ticketID: number): void {
    this.ticketService.getTicketByID(ticketID).subscribe((result: TicketDetails) => {
      console.log('result', result
      );
      this.ticket = result;
    });
  }

  /* ------------------------ Calculate Ticket Duration ----------------------- */
  calculateTicketDuration(ticket: TicketDetails): number {
    if (ticket.closedOn != null) {
      return dateDiff('d', ticket.submittedOn, ticket.closedOn, true);
    } else {
      return dateDiff('d', ticket.submittedOn, new Date(), false);
    }
  }

  /* --------------------------- Download Attachment -------------------------- */
  downloadTicketAttachment(attachment: FileModel): void {
    console.log('attachment', attachment);
    this.ticketService.downloadTicketAttachment(this.ticket.sNo, attachment.fileName).subscribe(result => {
      console.log(result);
    });
  }

  /* ---------------------------- Delete Attachment --------------------------- */
  deleteTicketAttachments(attachment: FileModel): void {
    ///
  }



}
