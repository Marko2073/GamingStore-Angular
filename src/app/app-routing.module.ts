import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';
import {AdminLayoutComponent} from "./admin-layout/components/admin-layout/admin-layout.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
      },
      {
        path: 'shop',
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
      },
      {
        path: 'builder',
        loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule)
      }


    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: ':table',
        loadChildren: () => import('./admin-table/admin-table.module').then(m => m.AdminTableModule)
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
