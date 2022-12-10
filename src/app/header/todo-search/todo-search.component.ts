import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoManagementService } from '../../../services/todo/todo-management.service';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.css'],
})
export class TodoSearchComponent implements OnInit {
  public search = new FormControl('');

  constructor(private todoMgmtService: TodoManagementService) {}

  ngOnInit() {}

  onSearch(event: Event) {
    event.preventDefault();
    this.todoMgmtService.filterTodo(this.search.value);
  }
}
