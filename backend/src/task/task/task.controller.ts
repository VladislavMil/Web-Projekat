import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @Get('project/:projectId')
    findAll(@Param('projectId') projectId: number) {
        return this.taskService.findAll(projectId);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.taskService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.taskService.remove(id);
    }

    @Put(':id')
    updateStatus(@Param('id') id: number) {
        return this.taskService.updateStatus(id);
    }
}
