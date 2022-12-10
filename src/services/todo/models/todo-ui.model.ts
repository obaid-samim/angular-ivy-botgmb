import { Todo } from '../../../app/shared/models/todo.model';

export interface TodoUi extends Todo {
  id: string;
  isSelected: boolean;
}
