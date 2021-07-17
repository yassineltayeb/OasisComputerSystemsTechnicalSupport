import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  apiUrl: string = environment.apiUrl + 'tickets/';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getActiveTickets() {
    return this.http.get(this.apiUrl + 'activetickets');
  }

  // tslint:disable-next-line:typedef
  getActiveTicketsStatus() {
    return this.http.get(this.apiUrl + 'activeticketsstatus');
  }
}
