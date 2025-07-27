import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../shared/models/product.model';
// import { CartService } from 'src/app/services/cart.service';
// import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  products: (Product & { quantity: number })[] = [];
  loading = false;
  showToast = false;
  toastMessage = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.loading = true;
    this.cartService.cart$.subscribe((cart) => {
      if (!cart) {
        this.products = [];
        this.loading = false;
        return;
      }

      // Assuming cartService.cart$ gives you enriched products with quantity
      // this.products = cart.products[].map((p) => ({
      //   ...p.product,
      //   quantity: p.quantity,
      // }));
      this.loading = false;
    });
  }

  updateQuantity(productId: number, change: number) {
    this.cartService.updateQuantity(productId, change);
    this.showToastMessage('Quantity updated.');
  }

  removeProduct(productId: number) {
    this.cartService.deleteCart(productId);
    this.showToastMessage('Product removed.');
  }

  getTotal(): number {
    return this.products.reduce((total, p) => total + p.price * p.quantity, 0);
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }
}
