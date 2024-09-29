import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResult } from '../interfaces/auth-result.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', { username, password })
      .pipe(tap((res: any) => this.setSession(res as AuthResult)));
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/auth/register', { username, password });
  }

  private setSession(authResult : AuthResult) {
    localStorage.setItem('token', authResult.access_token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  public isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
