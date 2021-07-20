import { Component, OnInit } from '@angular/core';
import { SystemModule } from 'src/app/models/SystemModule';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

  ticketsModules: SystemModule[] = [];
  listOfSelectedValue = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(result => {
      console.log('Tickets', result);
    });

    this.ticketService.getTicketsModules().subscribe((result: SystemModule[]) => {
      this.ticketsModules = result;
    });
  }

}
