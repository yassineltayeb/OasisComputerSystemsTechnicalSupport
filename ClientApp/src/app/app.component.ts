import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    // Check if user is logged in using the JWT
    this.getAuthenticationState();
  }

  getAuthenticationState(): void {
    this.authService.getIsLoggedIn().subscribe(value => (this.isLoggedIn = value));
  }

}
