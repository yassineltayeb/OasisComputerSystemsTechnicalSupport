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
  showIncorrectUsernameOrPassword: false;
  isLoading = false;

  constructor(private authService: AuthService,
              private notification: NzNotificationService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  // Initialize login from
  initForm(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

  }

  // Login
  login(user: UserLogin): void {
    this.showIncorrectUsernameOrPassword = false;
    this.isLoading = true;

    this.authService.login(user).subscribe(
      next => {
        this.isLoading = false;

        this.notification.success('Login', 'Logged successfully');
        this.authService.setIsLoggedIn(true);
      },
      err => {
        this.isLoading = false;
        this.notification.error('Login', 'Error in login');
        this.showIncorrectUsernameOrPassword = err.error.includes('Incorrect username or password');
        console.log('message', err.message);
        console.log('error', err.error);
      });
  }

}
