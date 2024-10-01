import { Component } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.css'
})
export class FriendListComponent {

  private subscription!: Subscription;
  //messages: string[] = [];
  friend: string = '';

  constructor(private webSocketService: WebSocketService) {

  }

  ngOnInit() {
    this.subscription = this.webSocketService.listen('friendReq').subscribe((message) => {
     // this.messages.push(message);
      console.log(message);
    });
  }

  sendFriendRequest() {
    this.webSocketService.emit('friendReq', this.friend);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.webSocketService.close();
  }

  confirmFriend() {
    console.log('Friend confirmed:', this.friend);
    this.sendFriendRequest();
  }
}
