import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/TodoService';

@Component({
  selector: 'app-todo-input',
  imports: [],
  templateUrl: './todo-input.html',
})
export class TodoInput {
  todoService = inject(TodoService);

  handleEnter(value: string) {
    if (!value.trim()) return;
    if (!this.todoService.currentUser()) return;
    const editing = this.todoService.taskToEdit();
    if (editing) {
      const updated = { ...editing, label: value };
      this.todoService.updateTask(updated).subscribe(() => {
        this.todoService.setTaskToEdit(null);
      });
    } else {
      this.todoService.createTask(value).subscribe();
    }
  }
}
