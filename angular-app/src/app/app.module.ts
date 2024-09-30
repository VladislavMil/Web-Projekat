import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { AuthInterceptor } from './interceptor/interceptor';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateProjectDialogComponent } from './components/create-project-dialog/create-project-dialog.component';
import { AppState } from './app.state';
import { projectReducer } from './store/project/project.reduce';
import { ProjectEffects } from './store/project/project.effect';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';
import { taskReducer } from './store/task/task.reduce';
import { TaskEffects } from './store/task/task.effect';
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WorkspaceComponent,
    CreateProjectComponent,
    CreateProjectDialogComponent,
    ProjectListComponent,
    ProjectDialogComponent,
    CreateTaskDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    StoreModule.forRoot<AppState>({projects:projectReducer, tasks:taskReducer}),
    StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly: !isDevMode()
    }),
    EffectsModule.forRoot([ProjectEffects, TaskEffects]),
    MatDatepickerModule,
    MatSelectModule,
    MatListModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true},
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
