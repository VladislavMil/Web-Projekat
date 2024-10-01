import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    friendId: number;

    @Column()
    status: boolean;

    @ManyToOne(() => User, user => user.friendships)
    user: User;

    @ManyToOne(() => User, user => user.friendRequests)
    friend: User;
}