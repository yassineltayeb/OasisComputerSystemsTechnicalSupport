import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from 'src/app/models/UserLogin';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  isLoggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  constructor(private http: HttpClient, private router: Router) { }

  // tslint:disable-next-line:typedef
  login(userLogin: UserLogin) {
    return this.http.post(this.apiUrl + 'login', userLogin).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
  }

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
  }

  getCurrentUser(): string {
    if (this.isLoggedIn) {
      const token = localStorage.getItem('token');
      return this.jwtHelper.decodeToken(token).unique_name;
    }
  }

  private tokenAvailable(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    // Clear JWT from localstorage
    localStorage.removeItem('token');
    // Update logged in status
    this.setIsLoggedIn(false);
    // Navigate user back to login page
    this.router.navigate(['/login']);
 }

}
