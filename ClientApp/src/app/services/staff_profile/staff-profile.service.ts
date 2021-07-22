import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffProfileService {

  apiUrl: string = environment.apiUrl + 'staffprofiles/';

  constructor(private http: HttpClient) { }

  // Get All Staff
  getStaffProfilesList(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
