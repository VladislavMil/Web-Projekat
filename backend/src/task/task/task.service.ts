import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/task.entity';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';


@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) { }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create({ ...createTaskDto, status: false });
        return this.taskRepository.save(task);
    }

    async findAll(projectId: number): Promise<Task[]> {
        return this.taskRepository.find({ where: { project: { id: projectId } } });
    }

    async findOne(id: number): Promise<Task> {
        return this.taskRepository.findOne({ where: { id } });
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (task) {
            this.taskRepository.merge(task, updateTaskDto);
            return this.taskRepository.save(task);
        }
        return null;
    }

    async remove(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }

    async findForMonth(year: number, month: number, filters: any): Promise<Task[]> {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        let query = this.taskRepository.createQueryBuilder('task')
            .where('task.deadline BETWEEN :start AND :end', { start: startDate, end: endDate });

        if (filters.status) {
            query = query.andWhere('task.status = :status', { status: filters.status });
        }

        if (filters.priority) {
            query = query.andWhere('task.priority = :priority', { priority: filters.priority });
        }

        if (filters.projectId) {
            query = query.andWhere('task.projectId = :projectId', { projectId: filters.projectId });
        }

        return query.getMany();
    }

    async updateStatus(id: number): Promise<Task> {
        let res=await this.taskRepository.update(id, { status: true });
        console.log(res);
        return this.taskRepository.findOneBy({id});
    }
}
