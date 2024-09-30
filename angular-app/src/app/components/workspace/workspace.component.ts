import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { loadProjects } from '../../store/project/project.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent {

  username: string = '';

  constructor(private authService: AuthService, private store: Store<AppState>, private router: Router) {
    store.dispatch(loadProjects());
  }

  ngOnInit() {
    this.authService.getUser().subscribe((res: any) => {
      this.username = res.username;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
