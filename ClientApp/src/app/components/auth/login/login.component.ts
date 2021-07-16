import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/models/UserLogin';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLogin = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  Login(): void {
    this.authService.login(this.user).subscribe(next => {
      // this.alertify.success('Logged successfully');
      this.authService.setIsLoggedIn(true);
    }, err => {
      // this.alertify.error(err.error.message);
      console.log(err);
    });
  }

}
