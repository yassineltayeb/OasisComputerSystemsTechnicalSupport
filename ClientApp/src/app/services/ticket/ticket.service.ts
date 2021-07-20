import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemModule } from 'src/app/models/SystemModule';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  apiUrl: string = environment.apiUrl + 'tickets/';

  params: any = {
    fullName: 'city',
    pageNumber: '1',
    pageSize: '10',
    sortBy: 'type',
    IsSortAscending: 'true',
  };

  constructor(private http: HttpClient) { }

  // Get All Tickets
  getTickets(): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketslist?' + this.toQueryString(this.params));
  }

  // Get Active Tickets
  getActiveTickets(): Observable<any> {
    return this.http.get(this.apiUrl + 'activetickets');
  }

  // Get All Tickets Status
  getTicketsStatus(): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketsstatus');
  }

  // Get Active Tickets Status
  getActiveTicketsStatus(): Observable<any> {
    return this.http.get(this.apiUrl + 'activeticketsstatus');
  }

  // Get Tickets Modules
  getTicketsModules(): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketmoduleslist');
  }

  // Convert Objet To Query String
  toQueryString(obj): string {
    const parts = [];

    for (const property of Object.keys(obj)) {
      const value = obj[property];
      if (value !== null && value !== undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }

    return parts.join('&');
  }
}
