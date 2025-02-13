import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cart-side',
  templateUrl: './cart-side.component.html',
  styleUrl: './cart-side.component.css'
})
export class CartSideComponent {
  @Input() cartItems: any[] = [];
  @Input() total: number = 0;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Initialize cartItems and total from localStorage if necessary
  }

  Checkout(event: any) {
    localStorage.removeItem('cart');
    this.router.navigate(['/home']);
  }
}
