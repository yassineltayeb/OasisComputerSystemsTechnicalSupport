import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUserName;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUserName = this.authService.getCurrentUser();
  }
}
