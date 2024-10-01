import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.projects)
    user: User;

    @OneToMany(() => Task, task => task.project)
    tasks: Task[];

    @Column()
    description: string;

    @Column("int", { nullable: true })
    userId: number;
}
