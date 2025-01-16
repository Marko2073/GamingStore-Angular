import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminTableComponent} from "./components/admin-table/admin-table.component";
import {BrandsComponent} from "./components/brands/brands.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {ModelsComponent} from "./components/models/models.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {ModelversionsComponent} from "./components/modelversions/modelversions.component";
import {ModelversionspecificationsComponent} from "./components/modelversionspecifications/modelversionspecifications.component";
import {SpecificationsComponent} from "./components/specifications/specifications.component";
import {UsersComponent} from "./components/users/users.component";
import {RolesComponent} from "./components/roles/roles.component";
import {PricesComponent} from "./components/prices/prices.component";
import {PicturesComponent} from "./components/pictures/pictures.component";
import {CategoryspecificationsComponent} from "./components/categoryspecifications/categoryspecifications.component";

const routes: Routes = [
  {
    path: "",
    component: AdminTableComponent
  },
  {
    path:'brands',
    component: BrandsComponent
  },
  {
    path:'models',
    component: ModelsComponent
  },
  {
    path:'categories',
    component:CategoriesComponent

  },
  {
    path:'modelversions',
    component:ModelversionsComponent

  },
  {
    path:'modelversionspecifications',
    component:ModelversionspecificationsComponent

  },
  {
    path:'specifications',
    component:SpecificationsComponent

  },
  {
    path:'users',
    component:UsersComponent

  },
  {
    path:'roles',
    component:RolesComponent

  },
  {
    path:'prices',
    component:PricesComponent
  },
  {
    path:'pictures',
    component:PicturesComponent
  },

  {
    path:'categoryspecifications',
    component:CategoryspecificationsComponent

  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTableRoutingModule {

}
