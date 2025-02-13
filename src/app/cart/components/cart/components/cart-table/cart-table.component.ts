import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.css'
})
export class CartTableComponent{
  @Input() cartItems: any[] = [];
  @Output() itemDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() quantityplus: EventEmitter<any> = new EventEmitter<any>();
  @Output() quantityminus: EventEmitter<any> = new EventEmitter<any>();
  BrisiLs(id: string) {
    this.cartItems = this.cartItems.filter((item) => {
      return item.id != id;
    });
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.itemDeleted.emit(id);
  }
  PlusItem(id: string) {
    this.cartItems = this.cartItems.map((item) => {
      if (item.id == id) {
        item.quantity++;
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.quantityplus.emit(id);
  }
  MinusItem(id: string) {
    this.cartItems = this.cartItems.map((item) => {
      if (item.id == id) {
        item.quantity--;
        if (item.quantity < 1) {
          item.quantity = 1;
        }
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.quantityminus.emit(id);
  }
}
