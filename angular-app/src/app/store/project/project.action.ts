import { createAction, props } from '@ngrx/store';
import { Project } from '../../models/project.model';

export const loadProjects = createAction(
    '[Project] Load Projects'
);

export const loadProjectsSuccess = createAction(
    '[Project] Load Projects Success',
    props<{ projects: Project[] }>()
);

export const loadProjectsFailure = createAction(
    '[Project] Load Projects Failure',
    props<{ error: any }>()
);

export const createProject = createAction(
    '[Project] Create Project',
    props<{ project: Project }>()
);

export const createProjectSuccess = createAction(
    '[Project] Create Project Success',
    props<{ project: Project }>()
);

export const createProjectFailure = createAction(
    '[Project] Create Project Failure',
    props<{ error: any }>()
);