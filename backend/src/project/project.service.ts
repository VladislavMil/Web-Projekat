import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/entities/project.entity';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import { Task } from 'src/entities/task.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) { }

    async create(createProjectDto: CreateProjectDto, id: number): Promise<Project> {
        const project = this.projectRepository.create({...createProjectDto, userId: id});
        return this.projectRepository.save(project);
    }

    async findAll(userId: number): Promise<Project[]> {
        return this.projectRepository.find({ where: { user: { id: userId } } });
    }

    async findOne(id: number): Promise<Project> {
        return this.projectRepository.findOne({ where: { id } });
    }

    async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (project) {
            this.projectRepository.merge(project, updateProjectDto);
            return this.projectRepository.save(project);
        }
        return null;
    }

    async remove(id: number): Promise<void> {
        await this.taskRepository.delete({ projectId: id });
        await this.projectRepository.delete(id);
    }
}
