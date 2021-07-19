import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  apiUrl: string = environment.apiUrl + 'tickets/';

  constructor(private http: HttpClient) { }

  filter = {
    fullName: 'City'
  };

  getTickets(): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketslist',
                              {
                                params:
                                {
                                  fullName: 'city',
                                  pageNumber: '1',
                                  pageSize: '10',
                                  sortBy: 'type',
                                  IsSortAscending: 'true',
                                }
                                });
  }

  getActiveTickets(): Observable<any> {
    return this.http.get(this.apiUrl + 'activetickets');
  }

  getTicketsStatus(): Observable<any> {
    return this.http.get(this.apiUrl + 'ticketsstatus');
  }

  getActiveTicketsStatus(): Observable<any> {
    return this.http.get(this.apiUrl + 'activeticketsstatus');
  }
}
