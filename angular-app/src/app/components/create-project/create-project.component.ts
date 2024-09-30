import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {



  constructor(private dialog: MatDialog) { }

  ngOnInit() {

  }

  createProject() {
    this.dialog.open(CreateProjectDialogComponent)
  }
}
