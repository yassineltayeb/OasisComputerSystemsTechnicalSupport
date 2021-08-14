import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/* -------------------------------------------------------------------------- */
/*                               Ticket Service                               */
/* -------------------------------------------------------------------------- */

export class TicketService {

  apiUrl: string = environment.apiUrl + 'tickets/';

  constructor(private http: HttpClient) { }

  /* ------------------------------- Add Ticket ------------------------------- */
  public addTicket(ticketFormData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, ticketFormData);
 }

  /* ----------------------------- Get All Tickets ---------------------------- */
  getTickets(ticketParams): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketslist' ,  { observe: 'response', params: ticketParams});
  }

  /* ---------------------------- Get Ticket By Id ---------------------------- */
  getTicketByID(ticketID: number): Observable<any> {
    return this.http.get(this.apiUrl +  ticketID);
  }

  /* ---------------------- Get Tickets Modules By Client --------------------- */
  getTicketsClientModules(clientId): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketclientmoduleslist/' + clientId);
  }

  /* --------------------------- Get Active Tickets --------------------------- */
  getActiveTickets(): Observable<any> {
    return this.http.get(this.apiUrl + 'activetickets');
  }

  /* ------------------------- Get All Tickets Status ------------------------- */
  getTicketsStatus(): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketsstatus');
  }

  /* ------------------------ Get Active Tickets Status ----------------------- */
  getActiveTicketsStatus(): Observable<any> {
    return this.http.get(this.apiUrl + 'activeticketsstatus');
  }

  /* --------------------------- Get Tickets Modules -------------------------- */
  getTicketsModules(): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketmoduleslist/');
  }

  /* ----------------------------- Get Status List ---------------------------- */
  getTicketStatusList(): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketstatuslist');
  }

  /* ----------------------------- Get Types List ----------------------------- */
  getTicketTypesList(): Observable<any> {
    return this.http.get(this.apiUrl + 'tickettypeslist');
  }

   /* ----------------------- Get Ticket Priorities List ----------------------- */
   getTicketPrioritiesList(): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketprioritieslist');
  }
}
