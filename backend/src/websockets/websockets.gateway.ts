import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { FriendshipService } from 'src/friendship/friendship/friendship.service';
import { Friendship } from 'src/entities/friendship.entity';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
})
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private userSocketMap: Map<number, string> = new Map();

  constructor(private userService: UserService, private friendshipService: FriendshipService) {}

  handleConnection(client: Socket) {
    const userId = Number(client.handshake.query.userId);
    if (userId) {
      this.userSocketMap.set(userId, client.id);
      console.log('Client connected:', client.id, 'User ID:', userId);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = Number(client.handshake.query.userId);
    if (userId) {
      this.userSocketMap.delete(userId);
      console.log('Client disconnected:', client.id, 'User ID:', userId);
    }
  }

  @SubscribeMessage('friendReq')
  async handleMessage(client: Socket, payload: any): Promise<string> {
    const userId = Number(client.handshake.query.userId);
    console.log('User ID:', userId);
    const user = await this.userService.getUser(userId);
    const sendUser = await this.userService.findOneByUsername(payload);
    console.log('Send User:', sendUser);

    const friendship = new Friendship();
    friendship.id = 0;
    friendship.userId = userId;
    friendship.friendId = sendUser.id;
    friendship.status = false;
    const savedFriendship = await this.friendshipService.create(friendship);
    console.log('Received message from client:', payload);

    const targetSocketId = this.userSocketMap.get(sendUser.id);
    if (targetSocketId) {
      this.server.to(targetSocketId).emit('friendReq', { ...savedFriendship, username: user.username });
    }
    return 'Message received';
  }

  @SubscribeMessage('allRequests')
  async allFriendRequests(client: Socket, payload: boolean) {
    const userId = Number(client.handshake.query.userId);
    console.log('User ID:', userId);
    const requests=(await this.friendshipService.findAllById(userId));
    console.log('Received message from client:', payload);
    const targetSocketId = this.userSocketMap.get(userId);
    if (targetSocketId) {
      this.server.to(targetSocketId).emit('allRequests', requests);
    }
  }

  @SubscribeMessage('acceptRequest')
  async acceptRequest(client: Socket, payload: number) {
    const userId = Number(client.handshake.query.userId);
    console.log('User ID:', userId);
    const friendship = await this.friendshipService.update(payload);
    console.log('Friend ship:', friendship);
    console.log('Received message from client:', payload);
    const targetSocketId = this.userSocketMap.get(friendship.friendId);
    if (targetSocketId) {
      this.server.to(targetSocketId).emit('acceptRequest', friendship);
    }
  }
}