import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as Actions from './task.action';
import { Action } from 'rxjs/internal/scheduler/Action';
import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';


export interface taskState extends EntityState<Task> { }

const adapter = createEntityAdapter<Task>();

export const initialState: taskState = adapter.getInitialState();

export const taskReducer = createReducer(initialState,
    on(Actions.loadTasksSuccess, (state, { tasks }) => adapter.setAll(tasks, state)),
    on(Actions.createTaskSuccess, (state, { task }) => adapter.addOne(task, state)));