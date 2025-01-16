import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTableRoutingModule } from './admin-table-routing.module';
import { AdminTableComponent } from './components/admin-table/admin-table.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ModelsComponent } from './components/models/models.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ModelversionsComponent } from './components/modelversions/modelversions.component';
import { ModelversionspecificationsComponent } from './components/modelversionspecifications/modelversionspecifications.component';
import { SpecificationsComponent } from './components/specifications/specifications.component';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { PricesComponent } from './components/prices/prices.component';
import { PicturesComponent } from './components/pictures/pictures.component';
import { CategoryspecificationsComponent } from './components/categoryspecifications/categoryspecifications.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AdminTableComponent,
    BrandsComponent,
    ModelsComponent,
    CategoriesComponent,
    ModelversionsComponent,
    ModelversionspecificationsComponent,
    SpecificationsComponent,
    UsersComponent,
    RolesComponent,
    PricesComponent,
    PicturesComponent,
    CategoryspecificationsComponent
  ],
  imports: [
    CommonModule,
    AdminTableRoutingModule,
    FormsModule
  ]
})
export class AdminTableModule { }
