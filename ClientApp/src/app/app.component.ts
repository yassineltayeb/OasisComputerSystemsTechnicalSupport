import { Component } from '@angular/core';
import { UserLogin } from './models/UserLogin';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';

  user: UserLogin = {
    username: 'yassin',
    password: '0924499169'
  };

  constructor(private authService: AuthService) {
    this.login();
  }

  // tslint:disable-next-line:typedef
  login() {
    // this.authService.login(this.user).subscribe(resonse => console.log(resonse));
  }
}
