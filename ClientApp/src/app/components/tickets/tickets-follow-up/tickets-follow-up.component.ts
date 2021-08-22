import { Component, Input, OnInit } from '@angular/core';
import { TicketNotes } from 'src/app/models/TicketNotes';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-tickets-follow-up',
  templateUrl: './tickets-follow-up.component.html',
  styleUrls: ['./tickets-follow-up.component.css']
})

/* -------------------------------------------------------------------------- */
/*                              Tickets Follow Up                             */
/* -------------------------------------------------------------------------- */

export class TicketsFollowUpComponent implements OnInit {

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */

  @Input() ticketId?: number;
  ticketNotes: TicketNotes[];

  /* -------------------------------------------------------------------------- */
  /*                                 Constructor                                */
  /* -------------------------------------------------------------------------- */

  constructor(private ticketService: TicketService) { }

  /* -------------------------------------------------------------------------- */
  /*                                  ngOnInit                                  */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    console.log('follow up', this.ticketId);
    this.getTicketNotes(this.ticketId);
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Get Ticket Notes ---------------------------- */
  getTicketNotes(ticketID: number): void {
    this.ticketService.getTicketNotes(ticketID).subscribe(result => {
      this.ticketNotes = result;
      console.log('Ticket Notes', this.ticketNotes);
    });
  }

}
