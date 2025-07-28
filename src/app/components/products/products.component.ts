import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/models/product.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  isLoggedIn = false;

  searchTerm: string = '';
  sortBy: string = '';

  showModal = false;
  productToDelete: number | null = null;

  showToast = false;
  showAddModal = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  cartMap: Map<number, number> = new Map(); // productId → quantity

  ngOnInit(): void {
    this.loadProducts();
    this.authService.token$.subscribe((token) => {
      this.isLoggedIn = !!token;
    });
    this.cartService.cart$.subscribe((cart) => {
      this.cartMap.clear();
      cart.products.forEach((p) => this.cartMap.set(p.productId, p.quantity));
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.filtered = [...data];
    });
  }

  search(): void {
    const term = this.searchTerm.toLowerCase();
    this.filtered = this.products.filter((p) =>
      p.title.toLowerCase().includes(term)
    );
    this.sort(); // Apply current sort after search
  }

  sort(): void {
    if (this.sortBy === 'price-asc') {
      this.filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      this.filtered.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'name-asc') {
      this.filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId);
  }

  increaseQty(productId: number): void {
    const currentQty = this.cartMap.get(productId) || 0;
    this.cartService.updateQuantity(productId, currentQty + 1);
  }

  decreaseQty(productId: number): void {
    const currentQty = this.cartMap.get(productId) || 0;
    if (currentQty === 1) {
      if (confirm('Remove this item from cart?')) {
        this.cartService.updateQuantity(productId, 0);
      }
    } else {
      this.cartService.updateQuantity(productId, currentQty - 1);
    }
  }

  openDeleteModal(productId: number): void {
    this.productToDelete = productId;
    this.showModal = true;
  }

  closeDeleteModal(): void {
    this.productToDelete = null;
    this.showModal = false;
  }

  confirmDelete(): void {
    if (!this.productToDelete) return;

    this.productService.deleteProduct(this.productToDelete).subscribe(() => {
      this.products = this.products.filter(
        (p) => p.id !== this.productToDelete
      );
      this.search();
      this.closeDeleteModal();
      this.triggerToast();
    });
  }

  triggerToast(): void {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000); // Hide after 3s
  }
  goToDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }
  getStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    return Array(fullStars).fill(1);
  }

  getHalfStars(rating: number): number[] {
    return rating % 1 >= 0.5 ? [1] : [];
  }

  getEmptyStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const totalStars = 5;
    return Array(totalStars - fullStars - halfStars).fill(1);
  }
}
