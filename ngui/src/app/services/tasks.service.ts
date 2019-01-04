import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../interfaces/task";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  getTasks<Observable>() {
    return this.http.get<Task[]>('/api/tasks');
  }

  completeTask (task: Task): Observable<Task> {
    return this.http.put<Task>(`/api/tasks/${task.id}`, task);
  }

  deleteTask (id: number): Observable<Task> {
    return this.http.delete<Task>(`/api/tasks/${id}`);
  }

  createTask (task: Task): Observable<Task> {
    return this.http.post<Task>('/api/tasks', task);
  }
}
