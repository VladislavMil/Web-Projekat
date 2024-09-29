import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: data => {
        if (data.access_token) {
          this.router.navigate(['/workspace']);
        } else {
          alert('Login failed.');
        }
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
