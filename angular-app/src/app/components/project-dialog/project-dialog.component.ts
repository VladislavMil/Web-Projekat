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
import { loadTasks } from '../../store/task/task.action';
import { selectTaskList } from '../../store/task/task.selection';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.css'
})
export class ProjectDialogComponent {

  public tasks:Observable<Task[]>=of([]);

  constructor(private dialogRef: MatDialogRef<ProjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Project, private dialog: MatDialog, private store: Store<AppState>) {
    this.store.dispatch(loadTasks({ projectId: data.id }));
    this.tasks = this.store.select(selectTaskList);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createTask(id: number) {
    this.dialog.open(CreateTaskDialogComponent, { data: id });
  }
}
