import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  
  private socket: Socket;

  constructor() {
    const token = localStorage.getItem('token');
    let userId = '';

    if (token) {
      const decodedToken: any = jwtDecode(token);
      userId = decodedToken.id;
    }
    this.socket = io('http://localhost:3000', {
      query: { userId }
    });
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  close() {
    this.socket.disconnect();
  }
}