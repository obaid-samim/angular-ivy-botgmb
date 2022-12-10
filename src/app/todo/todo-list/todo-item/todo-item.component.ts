import { Component, Input, OnInit } from '@angular/core';
import { TodoUi } from '../../../../services/todo/models/todo-ui.model';
import { TodoManagementService } from '../../../../services/todo/todo-management.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: TodoUi;

  constructor(private todoMgmtService: TodoManagementService) {}

  ngOnInit() {}

  public onTodoSelect() {
    this.todoMgmtService.todoSelect(this.todo.id);
  }

  public onDeleteTodo() {
    const isConfirmed = confirm('Are you sure you want to delete this todo?');
    if (isConfirmed) {
      this.todoMgmtService.deleteTodo(this.todo.id);
    }
  }
}
