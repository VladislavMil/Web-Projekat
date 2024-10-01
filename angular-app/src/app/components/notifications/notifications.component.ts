import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';
import { Friendship } from '../../models/friendship.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  private subscription!: Subscription;
  private listSubscription!: Subscription;
  public requests: Friendship[] = [];
  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.webSocketService.emit('allRequests', {});
    this.subscription = this.webSocketService.listen('friendReq').subscribe((friendReq) => {
      // this.messages.push(message);
      console.log(friendReq);
      this.requests.push(friendReq);
    });
    this.listSubscription = this.webSocketService.listen('allRequests').subscribe((requests) => {
      this.requests = requests;
      console.log(requests);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.webSocketService.close();
  }
}
