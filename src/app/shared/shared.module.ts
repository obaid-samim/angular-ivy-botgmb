import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTodoPipe } from './filter-todo.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FilterTodoPipe],
  exports: [FilterTodoPipe],
})
export class SharedModule {}
