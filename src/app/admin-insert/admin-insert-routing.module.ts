import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "../not-found/not-found.component";
import {BrandsComponent} from "./components/brands/brands.component";

const routes: Routes = [
  {
    path:'brands',
    component:BrandsComponent
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
export class AdminInsertRoutingModule { }
