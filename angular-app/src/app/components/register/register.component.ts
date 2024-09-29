import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.username, this.password).subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}
