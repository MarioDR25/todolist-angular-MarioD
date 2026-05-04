import { Component, inject } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faPencil, faX } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from '../../services/TodoService';
import { Task } from '../../interfaces/task.model';

@Component({
  selector: 'app-todo-list',
  imports: [FontAwesomeModule],
  templateUrl: './todo-list.html',
})
export class TodoList {
  todoService = inject(TodoService);

  constructor(library: FaIconLibrary) {
    // Registramos los iconos en la librería del componente
    library.addIcons(faX, faPencil, faCircleCheck);
  }

  onRemoveTask(id: number) {
    this.todoService.deleteTask(id).subscribe();
  }

  onToggleDone(item: Task) {
    const updated = { ...item, is_done: !item.is_done };
    this.todoService.updateTask(updated).subscribe();
  }

  onEditTask(item: Task) {
    this.todoService.setTaskToEdit(item);
  }
}
