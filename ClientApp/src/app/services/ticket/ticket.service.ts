import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemModule } from 'src/app/models/SystemModule';
import { TicketsParameters } from 'src/app/models/TicketsParameters';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  apiUrl: string = environment.apiUrl + 'tickets/';

  constructor(private http: HttpClient) { }

  // Get All Tickets
  getTickets(params1): Observable<any> {
    // return this.http.get(this.apiUrl + 'ticketslist?' + this.toQueryString(params));
    return this.http.get(this.apiUrl + 'ticketslist' ,  { observe: 'response', params: params1});
  }

  // getTickets(params1): Observable<any> {
  //   const httpParams = new HttpParams({ fromObject: params1 });
  //   return this.http.get(this.apiUrl + 'ticketslist' ,  { params: httpParams });
  // }

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

  // Get Status List
  getTicketStatusList(): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketstatuslist');
  }

  // Get Types List
  getTicketTypesList(): Observable<any> {
    return this.http.get(this.apiUrl + 'tickettypeslist');
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
