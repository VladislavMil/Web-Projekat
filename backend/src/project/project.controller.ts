import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
        return this.projectService.create(createProjectDto, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req) {
        return this.projectService.findAll(req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.projectService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectService.update(id, updateProjectDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.projectService.remove(id);
    }
}
