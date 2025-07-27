import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Cart, CartProduct } from '../../shared/models/cart.model';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit {
  cart?: Cart;
  products: (Product & { quantity: number })[] = [];
  loading = false;
  error = '';
  showToast = false;

  userId = 1; // Simulated logged-in user

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCartById(this.userId).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.fetchProducts(cart.products);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cart.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  fetchProducts(cartProducts: CartProduct[]): void {
    this.products = [];
    cartProducts.forEach((cp) => {
      this.productService.getProductById(cp.productId).subscribe({
        next: (product) => {
          const productWithQuantity = {
            ...product,
            quantity: cp.quantity,
          };
          this.products.push(productWithQuantity);
        },
        error: (err) => {
          console.error('Failed to fetch product', cp.productId, err);
        },
      });
    });
  }

  getTotal(): number {
    return this.products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  }

  updateQuantity(productId: number | undefined, delta: number): void {
    if (typeof productId !== 'number' || !this.cart) return;

    const product = this.cart.products.find((p) => p.productId === productId);
    if (!product) return;

    const newQty = product.quantity + delta;
    if (newQty < 1) return;

    product.quantity = newQty;

    this.cartService.updateQuantity(productId, newQty);
    this.loadCart();
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2000);
  }

  removeProduct(productId: number | undefined): void {
    if (typeof productId !== 'number' || !this.cart) return;

    this.cart.products = this.cart.products.filter(
      (p) => p.productId !== productId
    );

    this.cartService.updateCart(this.cart.id!, this.cart).subscribe(() => {
      this.loadCart();
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 2000);
    });
  }
}
