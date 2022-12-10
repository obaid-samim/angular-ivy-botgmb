import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../../app/shared/models/todo.model';
import { TodoDataService } from '../../data-access-layer/todo/todo-data.service';
import { TodoUi } from './models/todo-ui.model';

@Injectable()
export class TodoManagementService {
  private todoList: TodoUi[];
  public todoListUpdated = new BehaviorSubject<TodoUi[]>([]);
  public todoSelected = new BehaviorSubject<TodoUi>(null);
  public searching = new BehaviorSubject<string>('');

  constructor(private todoDataService: TodoDataService) {}

  public getTodoList() {
    this.todoDataService
      .getTodoList()
      .pipe(
        map((todos) => {
          const newTodos: TodoUi[] = [];
          for (let todoId in todos) {
            const todo: TodoUi = {
              id: todoId,
              isSelected: false,
              title: todos[todoId].title,
            };
            todos[todoId].summary
              ? (todo.summary = todos[todoId].summary)
              : null;
            newTodos.push(todo);
          }
          return newTodos;
        })
      )
      .subscribe((todos) => {
        this.todoList = todos;
        this.todoListUpdated.next(this.todoList.slice());
      });
  }

  public addTodo(todoValue: Todo) {
    this.todoDataService
      .addTodo(todoValue)
      .pipe(
        map((res) => {
          const newTodo: TodoUi = {
            ...todoValue,
            id: res.name,
            isSelected: false,
          };
          return newTodo;
        })
      )
      .subscribe((todo) => {
        this.todoList.push(todo);
        this.todoListUpdated.next(this.todoList.slice());
      });
  }

  public todoSelect(todoId: string) {
    let selectedTodo: TodoUi = null;
    for (let todo of this.todoList) {
      if (todo.id === todoId) {
        todo.isSelected = true;
        selectedTodo = todo;
      } else {
        todo.isSelected = false;
      }
    }
    this.todoListUpdated.next(this.todoList.slice());
    this.todoSelected.next({ ...selectedTodo });
  }

  public unselectAllTodos() {
    this.todoList.forEach((todo) => (todo.isSelected = false));
    this.todoListUpdated.next(this.todoList);
  }

  public editTodo(todoId: string, newTodoValue: Todo) {
    this.todoDataService.editTodo(todoId, newTodoValue).subscribe((res) => {
      const todo = this.todoList.find((todo) => todo.id === todoId);
      todo.title = newTodoValue.title;
      newTodoValue.summary ? (todo.summary = newTodoValue.summary) : null;
      this.todoListUpdated.next(this.todoList.slice());
    });
  }

  public deleteTodo(todoId: string) {
    this.todoDataService.deleteTodo(todoId).subscribe((res) => {
      let indexOfTodo: number;
      for (let i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].id === todoId) {
          indexOfTodo = i;
          break;
        }
      }
      this.todoList.splice(indexOfTodo, 1);
      this.todoListUpdated.next(this.todoList.slice());
    });
  }

  public filterTodo(searchedText: string) {
    this.searching.next(searchedText);
  }
}
