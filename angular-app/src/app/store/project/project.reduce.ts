import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Project } from '../../models/project.model';
import * as Actions from './project.action';
import { Action } from 'rxjs/internal/scheduler/Action';
import { createReducer, on } from '@ngrx/store';


export interface projectState extends EntityState<Project> { }

const adapter = createEntityAdapter<Project>();

export const initialState: projectState = adapter.getInitialState();

export const projectReducer = createReducer(initialState,
    on(Actions.loadProjectsSuccess, (state, { projects }) => adapter.setAll(projects, state)),
    on(Actions.createProjectSuccess, (state, { project }) => adapter.addOne(project, state)),
    on(Actions.deleteProjectSuccess, (state, { id }) => adapter.removeOne(id, state)));