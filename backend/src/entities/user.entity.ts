import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { Project } from './project.entity';
import { Friendship } from './friendship.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Project, project => project.user)
    projects: Project[];
    friendships: Friendship[];
    friendRequests: Friendship[];
}
