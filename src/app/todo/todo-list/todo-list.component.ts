import { Component, OnInit } from '@angular/core';
import { TodoUi } from '../../../services/todo/models/todo-ui.model';
import { TodoManagementService } from '../../../services/todo/todo-management.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  public todoList: TodoUi[];
  public searchedText: string;

  constructor(private todoMgmtService: TodoManagementService) {}

  ngOnInit() {
    this.todoMgmtService.todoListUpdated.subscribe((todos) => {
      this.todoList = todos;
    });
    this.todoMgmtService.getTodoList();

    this.todoMgmtService.searching.subscribe((searchedValue) => {
      this.searchedText = searchedValue;
    });
  }
}
