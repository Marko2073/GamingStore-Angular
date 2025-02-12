import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './components/shop/shop.component';
import { CardComponent } from './components/shop/components/card/card.component';


@NgModule({
  declarations: [
    ShopComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
