import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskResponse } from '../interfaces/task.model';
import { catchError, map, Observable, tap } from 'rxjs';

const URL = 'https://playground.4geeks.com/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  tasks = signal<Task[]>([]);
  taskToEdit = signal<Task | null>(null);
  currentUser = signal<string>('');

  constructor() {}

  getTasks(user: string): Observable<Task[]> {
  return this.http.get<TaskResponse>(`${URL}/users/${user}`).pipe(
    map(({ todos }) => todos),
    tap((items) => this.tasks.set(items)),
  );
}

  createUser(user: string): Observable<void> {
    return this.http.post<void>(`${URL}/users/${user}`, null);
  }

  createTask(task: string): Observable<Task> {
  return this.http
    .post<Task>(`${URL}/todos/${this.currentUser()}`, { label: task, is_done: false })
    .pipe(
      tap((newTask) => {
        this.tasks.update((prev) => [...prev, newTask]);
      })
    );
}

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${URL}/todos/${id}`).pipe(
      tap(() => {
        this.tasks.update((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }),
    );
  }

  setTaskToEdit(item: Task | null) {
  this.taskToEdit.set(item);
}



  updateTask(item: Task): Observable<Task> {
    return this.http
      .put<Task>(`${URL}/todos/${item.id}`, { label: item.label, is_done: item.is_done })
      .pipe(
        tap((updatedTask) => {
          this.tasks.update((tasks) =>
            tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
          );
        }),
      );
  }
}
