import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  declarations: [HeaderComponent, TodoSearchComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
