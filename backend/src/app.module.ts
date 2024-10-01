import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { AuthController } from './auth/auth/auth.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth/auth.module';
import { ProjectController } from './project/project.controller';
import { TaskController } from './task/task/task.controller';
import { ProjectService } from './project/project.service';
import { TaskService } from './task/task/task.service';
import { WebsocketsGateway } from './websockets/websockets.gateway';
import { FriendshipService } from './friendship/friendship/friendship.service';
import { Friendship } from './entities/friendship.entity';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgrpass',
      database: 'taskmanagerdb',
      entities: [User, Project, Task, Friendship],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Project, Task, Friendship]),
    AuthModule
  ],
  controllers: [AppController, AuthController, ProjectController, TaskController],
  providers: [AppService, UserService, ProjectService, TaskService, WebsocketsGateway, FriendshipService],
})
export class AppModule { }
