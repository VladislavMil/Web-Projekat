import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {

  private subscription!: Subscription;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.subscription = this.webSocketService.listen('allRequests').subscribe((message) => {
      console.log(message);
    });
  }

  allFriendRequests() { }
}
