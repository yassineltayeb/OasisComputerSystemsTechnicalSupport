import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketList } from 'src/app/models/TicketList';
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

  ticket: TicketList;

  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private ticketService: TicketService, private route: ActivatedRoute) { }

  /* -------------------------------------------------------------------------- */
  /*                                  ngOnInit                                  */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    const ticketID = this.getTicketIDFromQueryParam();
    this.getTicketByID(ticketID);
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  /* --------------------- Get Ticket ID From QueryParams --------------------- */
  getTicketIDFromQueryParam(): number {
    return this.route.snapshot.params.ticketID;
  }

  /* ---------------------------- Get Ticket By ID ---------------------------- */
  getTicketByID(ticketID: number): void {
    this.ticketService.getTicketByID(ticketID).subscribe((result: TicketList) => {
      console.log('ticket', result);
      this.ticket = result;
    });
  }


}
