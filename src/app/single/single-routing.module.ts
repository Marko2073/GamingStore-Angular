import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SingleComponent} from "./components/single/single.component";

const routes: Routes = [
  {
    path:"",
    component:SingleComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleRoutingModule { }
