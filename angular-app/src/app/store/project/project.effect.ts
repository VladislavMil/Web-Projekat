import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../../services/project.service';
import * as ProjectActions from './project.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProjectEffects {

    constructor(
        private actions$: Actions,
        private projectService: ProjectService
    ) { }

    loadProjects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProjectActions.loadProjects),
            mergeMap(() =>
                this.projectService.getAll().pipe(
                    map(projects => ProjectActions.loadProjectsSuccess({ projects })),
                    catchError(error => of(ProjectActions.loadProjectsFailure({ error })))
                )
            )
        )
    }
    );

    createProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.createProject),
            mergeMap(action => {
                console.log('Action:', action);
                return this.projectService.create(action.project).pipe(
                    map(project => ProjectActions.createProjectSuccess({ project })),
                    catchError(error => of(ProjectActions.createProjectFailure({ error })))
                )
            }
            )
        )
    );

    deleteProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.deleteProject),
            mergeMap(action =>
                this.projectService.delete(action.id).pipe(
                    map(() => ProjectActions.deleteProjectSuccess({ id: action.id })),
                    catchError(error => of(ProjectActions.deleteProjectFailure({ error })))
                )
            )
        )
    );
}