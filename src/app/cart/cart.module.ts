import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { CartSideComponent } from './components/cart/components/cart-side/cart-side.component';
import { CartTableComponent } from './components/cart/components/cart-table/cart-table.component';


@NgModule({
  declarations: [
    CartComponent,
    CartSideComponent,
    CartTableComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
