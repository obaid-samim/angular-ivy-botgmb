import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../app/shared/models/todo.model';
import { TodoData } from './models/todo-data.model';

@Injectable()
export class TodoDataService {
  private readonly BASE_URL =
    'https://learn-angular-d2fed-default-rtdb.asia-southeast1.firebasedatabase.app';

  constructor(private http: HttpClient) {}

  public getTodoList(): Observable<TodoData> {
    return this.http.get<TodoData>(this.BASE_URL + '/todos.json');
  }

  public addTodo(todoValue: Todo): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      this.BASE_URL + '/todos.json',
      todoValue
    );
  }

  public editTodo(todoId: string, newTodoValue: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      this.BASE_URL + `/todos/${todoId}.json`,
      newTodoValue
    );
  }

  public deleteTodo(todoId: string): Observable<any> {
    return this.http.delete(this.BASE_URL + `/todos/${todoId}.json`);
  }
}
