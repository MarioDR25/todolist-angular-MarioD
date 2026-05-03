import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoInput } from './components/todo-input/todo-input';
import { TodoList } from './components/todo-list/todo-list';
import { TodoService } from './services/TodoService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoInput, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  
  todoService = inject(TodoService);


  onSearch(user: string) {
    if (!user.trim()) return;

    this.todoService.getTasks(user).subscribe({
      next: () => {
        this.todoService.currentUser.set(user)
        console.log('Usuario encontrado, cargando tareas...', this.todoService.tasks());
      },
      error: (err) => {
        if (err.status === 404) {
          console.warn(`Es ${err.status} porque el usuario no existe, creando...`);
          this.onAddUser(user);
        } else {
          console.error('Ocurrió un error:', err);
        }
      },
    });
  }

  onAddUser(user: string) {
    this.todoService.createUser(user).subscribe({
      next: () => {
        this.todoService.tasks.set([]);
        this.todoService.currentUser.set(user)
      },
      error: (err) => console.error('No se pudo crear el usuario', err),
    });
  }
}
