import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MatDialogRef } from '@angular/material/dialog';
import { createProject } from '../../store/project/project.action';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrl: './create-project-dialog.component.css'
})
export class CreateProjectDialogComponent {

  projectName: string = '';
  projectDescription: string = '';

  constructor(private store: Store<AppState>, private dialogRef: MatDialogRef<CreateProjectDialogComponent>) { }

  onSubmit() {
    this.store.dispatch(createProject({project: {
      name: this.projectName, description: this.projectDescription,
      id: 0,
      userId: 0
    }}));
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
