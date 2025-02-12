import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../interfaces/product";

@Component({
  selector: 'app-wcard',
  templateUrl: './wcard.component.html',
  styleUrl: './wcard.component.css'
})
export class WcardComponent {
  @Input() product!: Product;
  @Output() addToCartEvent = new EventEmitter<void>();


  AddToCart(event:any, id:string){
    this.addToCartEvent.emit();
    let cart: any[] = [];
    let item = {
      id: id,
      quantity: 1
    };
    let cartData = localStorage.getItem('cart');
    if(cartData == null){
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));


    } else {
      let index = -1;
      cart = JSON.parse(cartData);
      for(let i = 0; i < cart.length; i++){
        if(cart[i].id === id){
          index = i;
          break;
        }
      }
      if(index === -1){
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }

  }

}
