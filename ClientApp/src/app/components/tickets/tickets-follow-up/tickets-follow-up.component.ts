import { Component, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';

@Component({
  selector: 'app-tickets-follow-up',
  templateUrl: './tickets-follow-up.component.html',
  styleUrls: ['./tickets-follow-up.component.css']
})

/* -------------------------------------------------------------------------- */
/*                              Tickets Follow Up                             */
/* -------------------------------------------------------------------------- */
export class TicketsFollowUpComponent implements OnInit {

  time = formatDistance(new Date(), new Date());

  constructor() { }

  ngOnInit(): void { }

}
