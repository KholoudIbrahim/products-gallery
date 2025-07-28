import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Cart } from '../../shared/models/cart.model';
import { Product } from '../../shared/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  loading = false;
  error = '';
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  showToast = false;
  toastMessage = '';
  selectedCart?: Cart;
  productMap: { [id: number]: Product } = {};
  expandedCartIds: number[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCarts();
  }

  loadCarts(): void {
    this.loading = true;
    this.cartService.loadAllCarts().subscribe({
      next: (res) => {
        this.carts = res;
        const productIds = new Set<number>();
        res.forEach((cart) =>
          cart.products.forEach((p) => productIds.add(p.productId))
        );
        productIds.forEach((id) => {
          if (!this.productMap[id]) {
            this.productService.getProductById(id).subscribe((product) => {
              this.productMap[id] = product;
            });
          }
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load carts.';
        this.loading = false;
      },
    });
  }

  openEditModal(cart: Cart): void {
    this.selectedCart = {
      ...cart,
      products: cart.products.map((item) => ({
        productId: item.productId, // Keep the productId for CartProduct
        quantity: item.quantity, // Retain the quantity
      })),
    };
    this.showEditModal = true;
  }

  openDeleteModal(cart: Cart): void {
    this.selectedCart = cart;
    this.showDeleteModal = true;
  }

  closeModals(): void {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.selectedCart = undefined;
  }

  updateCart(): void {
    if (!this.selectedCart?.id) return;

    const updatedCart = {
      ...this.selectedCart,
      products: this.selectedCart.products.map((product) => ({
        productId: product.productId, // Ensure correct product structure
        quantity: product.quantity, // Retain the quantity
        // You can map other product properties if needed, but ensure the structure is correct
      })),
    };

    this.cartService
      .updateCart(this.selectedCart.id, updatedCart)
      .subscribe(() => {
        this.loadCarts();
        this.toast('Cart updated successfully');
        this.closeModals();
      });
  }

  deleteCart(): void {
    if (!this.selectedCart?.id) return;
    this.cartService.deleteCart(this.selectedCart.id).subscribe(() => {
      this.loadCarts();
      this.toast('Cart deleted successfully');
      this.closeModals();
    });
  }

  toast(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2000);
  }

  getCartItemCount(cart: Cart): number {
    return cart.products?.reduce((sum, p) => sum + p.quantity, 0) || 0;
  }

  getCartTotal(cart: Cart): number {
    return (
      cart.products?.reduce((sum, p) => {
        const product = this.productMap[p.productId];
        return sum + (product ? product.price * p.quantity : 0);
      }, 0) || 0
    );
  }

  getCartThumbnails(cart: Cart): Product[] {
    return cart.products
      .map((p) => this.productMap[p.productId])
      .filter((p) => !!p)
      .slice(0, 4);
  }

  toggleExpandCart(cartId: number): void {
    if (this.expandedCartIds.includes(cartId)) {
      this.expandedCartIds = this.expandedCartIds.filter((id) => id !== cartId);
    } else {
      this.expandedCartIds.push(cartId);
    }
  }

  isExpanded(cartId: number): boolean {
    return this.expandedCartIds.includes(cartId);
  }
}
