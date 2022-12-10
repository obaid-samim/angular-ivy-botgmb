import { Pipe, PipeTransform } from '@angular/core';
import { TodoUi } from '../../services/todo/models/todo-ui.model';

@Pipe({
  name: 'filterTodo',
})
export class FilterTodoPipe implements PipeTransform {
  transform(todos: TodoUi[], searchedText: string): TodoUi[] {
    const searchedValue = this.cleanTxt(searchedText);
    if (searchedValue === '') {
      return todos;
    }

    return todos.filter((todo) => {
      const title = this.cleanTxt(todo.title);
      const summary = todo.summary ? this.cleanTxt(todo.summary) : '';
      return title.includes(searchedValue) || summary.includes(searchedValue);
    });
  }

  private cleanTxt(text: string): string {
    return text.trim().toLowerCase();
  }
}
