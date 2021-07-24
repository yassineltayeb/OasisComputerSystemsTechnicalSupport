import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl: string = environment.apiUrl + 'clients/';

  constructor(private http: HttpClient) { }

  // Get Clients
  getClients(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
