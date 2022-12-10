import { Todo } from '../../../app/shared/models/todo.model';

export interface TodoData {
  [id: string]: Todo;
}
