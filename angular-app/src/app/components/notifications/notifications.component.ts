import { Component } from '@angular/core';
import { map, merge, Observable, Subscription } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';
import { Friendship } from '../../models/friendship.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  private observableAll$!: Observable<Friendship[]>;
  private observableNotification$!: Observable<Friendship[]>;
  public requests: Friendship[] = [];
  public chatList: Friendship[] = [];
  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.webSocketService.emit('allRequests', {});
    this.observableAll$ = this.webSocketService.listen('friendReq').pipe(map((e:Friendship)=>{
      return [e];
    }))
    this.observableNotification$ = this.webSocketService.listen('allRequests');
    merge(this.observableAll$, this.observableNotification$).subscribe((data: Friendship[]) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if(data[i].status === false){
          this.requests.push(data[i]);
        }
        else{
          this.chatList.push(data[i]);
        }
      }
    });
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

  acceptRequest(id: number) {
    this.webSocketService.emit('acceptRequest', id);
    this.requests = this.requests.filter((request) => request.id !== id);
  }
}
