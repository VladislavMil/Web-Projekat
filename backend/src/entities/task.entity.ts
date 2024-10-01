import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    deadline: Date;

    @ManyToOne(() => Project, project => project.tasks)
    project: Project
    
    @Column ("int", { nullable: true })
    projectId: number;

    @Column()
    importance: string;

    @Column()
    status: boolean
}
