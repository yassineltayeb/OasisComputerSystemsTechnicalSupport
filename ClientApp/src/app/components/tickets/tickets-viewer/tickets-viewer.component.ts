import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { dateDiff } from 'src/app/helpers/helpers';
import { FileModel } from 'src/app/models/FileModel';
import { TicketDetails } from 'src/app/models/TicketDetails';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import * as download from 'downloadjs';
import { saveAs } from 'file-saver';

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
    window.open(attachment.url, null);
    window.open(attachment.url, '_blank');
    window.location.href = attachment.url;
    this.ticketService.downloadTicketAttachment(this.ticket.sNo, attachment.fileName).subscribe(result => {
      // console.log('file result', result);
      // download(result, attachment.fileName, attachment.type);
    });

    // this.ticketService.downloadTicketAttachment2(this.ticket.sNo, attachment.fileName).subscribe(blob => {
    //   console.log('file result', blob);
    //   const str = 'hello world', arr = new Uint8Array(str.length);
    //   // tslint:disable-next-line:typedef
    //   str.split('').forEach(function(a, b) {
    //     arr[b] = a.charCodeAt();
    //   });

    //   console.log(arr);
    //   download(arr, attachment.fileName);

    //   // const file = new Blob([blob], { type: 'text/plain' });
    //   // saveAs(file, attachment.fileName);
    // });
  }

  /* ---------------------------- Delete Attachment --------------------------- */
  deleteTicketAttachments(attachment: FileModel): void {
    ///
  }



}
