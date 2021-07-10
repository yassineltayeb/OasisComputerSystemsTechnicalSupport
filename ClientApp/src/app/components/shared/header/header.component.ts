import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false;
  isOnMidScreen = false;
  currentUserName;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUserName = this.authService.getCurrentUser();
    this.getScreenSize();
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  // Listen for window size changes
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?): void {
     // If browser window is resized below mid screen size width
     window.innerWidth <= 858 ? this.isOnMidScreen = true : this.isOnMidScreen = false;
  }

  logout(): void {
    this.authService.logout();
 }

}
