import { Component, OnInit } from '@angular/core';
import { ActiveTickets } from 'src/app/models/ActiveTickets';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  activeTickets: ActiveTickets[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.getActiveTickets().subscribe((result: ActiveTickets[]) => {
      this.activeTickets = result;
      console.log(this.activeTickets);
    });
  }

}
