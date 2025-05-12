import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './components/shop/shop.component';
import { CardComponent } from './components/shop/components/card/card.component';
import { WcardComponent } from './components/shop/components/wcard/wcard.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ShopComponent,
    CardComponent,
    WcardComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
