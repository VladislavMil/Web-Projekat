import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { selectProjectList } from '../../store/project/project.selection';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

  projects$: Observable<Project[]> = of([]);

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.projects$ = this.store.select(selectProjectList);
  }

  openDialog(project: Project) {
    this.dialog.open(ProjectDialogComponent, { data: project });
  }
}
