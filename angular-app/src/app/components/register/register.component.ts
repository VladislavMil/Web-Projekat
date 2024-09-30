import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = ""; //komenentar
  password: string = "";
  passwordLengthValid: boolean = false;
  passwordHasNumber: boolean = false;
  passwordHasCapital: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.username, this.password).subscribe(data => {
      this.router.navigate(['/login']);
    });
  }

  checkPassword() {
    const lengthRegex = /^.{8,20}$/;
    const numberRegex = /\d/;
    const capitalLetterRegex = /[A-Z]/;

    this.passwordLengthValid = lengthRegex.test(this.password);
    this.passwordHasNumber = numberRegex.test(this.password);
    this.passwordHasCapital = capitalLetterRegex.test(this.password);
  }

  isFormValid(): boolean {
    return this.username.trim() !== "" && this.passwordLengthValid && this.passwordHasNumber && this.passwordHasCapital;
  }
}
