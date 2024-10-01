import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  create(project: any): Observable<Project> {
    return this.http.post<Project>('http://localhost:3000/project', project);
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:3000/project');
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/project/${id}`);
  }
}
