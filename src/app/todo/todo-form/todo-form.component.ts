import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoManagementService } from '../../../services/todo/todo-management.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  public formState: 'add' | 'edit' = 'add';
  private selectedTodoId: string;

  // Form
  public todoForm: FormGroup;
  public todoTitle = new FormControl('', Validators.required);
  public todoSummary = new FormControl('');

  constructor(private todoMgmtService: TodoManagementService) {}

  ngOnInit() {
    this.todoForm = new FormGroup({
      title: this.todoTitle,
      summary: this.todoSummary,
    });
    this.todoMgmtService.todoSelected.subscribe((selectedTodo) => {
      if (selectedTodo) {
        this.formState = 'edit';
        this.selectedTodoId = selectedTodo.id;
        this.todoForm.patchValue(selectedTodo);
      }
    });
  }

  public onAddTodo() {
    this.todoMgmtService.addTodo(this.todoForm.value);
  }

  public onEditTodo() {
    this.todoMgmtService.editTodo(this.selectedTodoId, this.todoForm.value);
  }

  public onFormReset() {
    this.formState = 'add';
    this.selectedTodoId = null;
    this.todoForm.reset();
    this.todoMgmtService.unselectAllTodos();
  }
}
