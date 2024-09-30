import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { createTask } from '../../store/task/task.action';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrl: './create-task-dialog.component.css'
})
export class CreateTaskDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private store: Store<AppState>, private dialogRef: MatDialogRef<CreateTaskDialogComponent>) { }

  task = {
    title: '',
    description: '',
    deadline: '',
    importance: ''
  };

  createTask() {
    this.store.dispatch(createTask({ task: { ...this.task, id: 0, projectId: this.data } }));
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
