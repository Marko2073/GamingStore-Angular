import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTableRoutingModule } from './admin-table-routing.module';
import { AdminTableComponent } from './components/admin-table/admin-table.component';


@NgModule({
  declarations: [
    AdminTableComponent
  ],
  imports: [
    CommonModule,
    AdminTableRoutingModule
  ]
})
export class AdminTableModule { }
