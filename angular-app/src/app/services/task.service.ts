import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(projectId: number) {
    return this.http.get<Task[]>(`http://localhost:3000/task/project/${projectId}`);
  }

  createTask(task: Task) {
    return this.http.post<Task>('http://localhost:3000/task', task);
  }

  updateTask(id: number) {
    return this.http.put<Task>(`http://localhost:3000/task/${id}`, {});
  }
}
