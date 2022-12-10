import { NgModule } from '@angular/core';
import { TodoManagementService } from '../../services/todo/todo-management.service';
import { TodoDataService } from '../../data-access-layer/todo/todo-data.service';

@NgModule({
  providers: [TodoManagementService, TodoDataService],
})
export class CoreModule {}
