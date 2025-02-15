import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: 'app-cart-side',
  templateUrl: './cart-side.component.html',
  styleUrl: './cart-side.component.css'
})
export class CartSideComponent {
  @Input() cartItems: any[] = [];
  @Input() total: number = 0;
  @Output() checkoutSuccess = new EventEmitter<void>();  // Dodajemo event emitter

  constructor(private router: Router, private http: HttpClient) {}

  Checkout(event: any) {
    const url = 'http://localhost:5083/api/carts';
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const formData = {
      cartItems: cart.map((item:any) => {
        return {
          modelVersionId: item.id,
          quantity: item.quantity
        };
      }),
    };

    this.postData(url, formData).subscribe({
      next: (response) => {
        console.log('Purchase successful for item', cart);
        localStorage.removeItem('cart');
        this.checkoutSuccess.emit();  // Emitujemo događaj
      },
      error: (error) => console.error('Error during purchase', error)
    });
  }

  postData(url: string, formData: any): Observable<any> {
    return this.http.post<any>(url, formData);
  }
  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
