import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTableRoutingModule } from './admin-table-routing.module';
import { AdminTableComponent } from './components/admin-table/admin-table.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ModelsComponent } from './components/models/models.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ModelversionsComponent } from './components/modelversions/modelversions.component';
import { ModelversionspecificationsComponent } from './components/modelversionspecifications/modelversionspecifications.component';

@NgModule({
  declarations: [
    AdminTableComponent,
    BrandsComponent,
    ModelsComponent,
    CategoriesComponent,
    ModelversionsComponent,
    ModelversionspecificationsComponent
  ],
  imports: [
    CommonModule,
    AdminTableRoutingModule
  ]
})
export class AdminTableModule { }
