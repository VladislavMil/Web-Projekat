import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import * as TaskActions from './task.action';

@Injectable()
export class TaskEffects {

    constructor(
        private actions$: Actions,
        private taskService: TaskService
    ) { }

    loadTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.loadTasks),
            mergeMap(action =>
                this.taskService.getTasks(action.projectId).pipe(
                    map(tasks => TaskActions.loadTasksSuccess({ tasks })),
                    catchError(error => of(TaskActions.loadTasksFailure({ error })))
                )
            )
        )
    );

    createTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.createTask),
            mergeMap(action =>
                this.taskService.createTask(action.task).pipe(
                    map(task => TaskActions.createTaskSuccess({ task })),
                    catchError(error => of(TaskActions.createTaskFailure({ error })))
                )
            )
        )
    );

    updateTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.updateTask),
            mergeMap(action =>
                this.taskService.updateTask(action.id).pipe(
                    map(task => TaskActions.updateTaskSuccess({ task })),
                    catchError(error => of(TaskActions.updateTaskFailure({ error })))
                )
            )
        )
    );
}