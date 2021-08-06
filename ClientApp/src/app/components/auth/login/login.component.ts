import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserLogin } from 'src/app/models/UserLogin';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private notification: NzNotificationService, private fb: FormBuilder) { }

  ngOnInit(): void {

    // Initialize login from
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  // Login
  login(user: UserLogin): void {
    this.authService.login(user).subscribe(next => {
      this.notification.success('Login', 'Logged successfully');
      this.authService.setIsLoggedIn(true);
    }, err => {
      this.notification.error('Login', 'Logged successfully');
      console.log(err);
    });
  }

}
