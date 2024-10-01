import { Component, Inject, inject } from '@angular/core';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../models/project.model';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { loadTasks, updateTask } from '../../store/task/task.action';
import { selectTaskFinished, selectTaskList, selectTaskNotFinished } from '../../store/task/task.selection';
import { deleteProject } from '../../store/project/project.action';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.css'
})
export class ProjectDialogComponent {

  public tasks: Observable<Task[]> = of([]);
  public finishedTasks: Observable<Task[]> = of([]);

  constructor(private dialogRef: MatDialogRef<ProjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Project, private dialog: MatDialog, private store: Store<AppState>) {
    this.store.dispatch(loadTasks({ projectId: data.id }));
    this.tasks = this.store.select(selectTaskNotFinished);
    this.finishedTasks = this.store.select(selectTaskFinished);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createTask(id: number) {
    this.dialog.open(CreateTaskDialogComponent, { data: id });
  }

  deleteProject(id: number) {
    this.store.dispatch(deleteProject({ id }));
    this.dialogRef.close();
  }

  finishTask(id: number) {
    this.store.dispatch(updateTask({ id }));
  }
}
