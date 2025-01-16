import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminInsertRoutingModule } from './admin-insert-routing.module';
import { AdminInsertComponent } from './components/admin-insert/admin-insert.component';
import { BrandsComponent } from './components/brands/brands.component';


@NgModule({
  declarations: [
    AdminInsertComponent,
    BrandsComponent
  ],
  imports: [
    CommonModule,
    AdminInsertRoutingModule
  ]
})
export class AdminInsertModule { }
