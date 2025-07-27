import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  originalProduct!: Product;
  isEditing = false;
  toastMessage = '';
  toastSuccess = true;
  showDeleteModal = false;
  lastDeletedProduct: Product | null = null;
  inCartQty = 0; // assuming integration with cart later

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = { ...product };
        this.originalProduct = { ...product }; // for cancel/reset logic
      },
      error: (err) => console.error('❌ Failed to load product', err),
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    // If cancelling edit, revert product to original
    if (!this.isEditing) {
      this.product = { ...this.originalProduct };
    }
  }

  updateProduct(): void {
    this.productService.updateProduct(this.product.id, this.product).subscribe({
      next: () => {
        this.toastMessage = 'Product updated successfully';
        this.toastSuccess = true;
        this.isEditing = false;
        this.originalProduct = { ...this.product };
        this.autoHideToast();
      },
      error: (err) => {
        this.toastMessage = 'Failed to update product';
        this.toastSuccess = false;
        this.autoHideToast();
        console.error(err);
      },
    });
  }

  confirmDelete(): void {
    this.showDeleteModal = true;
  }

  closeModal(): void {
    this.showDeleteModal = false;
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.id).subscribe({
      next: () => {
        this.lastDeletedProduct = { ...this.product };
        this.toastMessage = 'Product deleted';
        this.toastSuccess = true;
        this.showDeleteModal = false;
        this.autoHideToast();
        setTimeout(() => this.router.navigate(['/products']), 1500);
      },
      error: (err) => {
        this.toastMessage = 'Failed to delete product';
        this.toastSuccess = false;
        this.autoHideToast();
        console.error(err);
      },
    });
  }

  undoDelete(): void {
    if (!this.lastDeletedProduct) return;

    this.productService.createProduct(this.lastDeletedProduct).subscribe({
      next: (restored) => {
        this.product = restored;
        this.toastMessage = 'Product restored';
        this.toastSuccess = true;
        this.lastDeletedProduct = null;
        this.autoHideToast();
      },
      error: (err) => {
        this.toastMessage = 'Failed to restore product';
        this.toastSuccess = false;
        this.autoHideToast();
        console.error(err);
      },
    });
  }

  clearToast(): void {
    this.toastMessage = '';
  }

  private autoHideToast(): void {
    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

  increaseQty(): void {
    this.inCartQty++;
  }

  decreaseQty(): void {
    if (this.inCartQty === 1) {
      if (confirm('Remove this product from cart?')) {
        this.inCartQty = 0;
      }
    } else {
      this.inCartQty--;
    }
  }

  addToCart(): void {
    this.inCartQty = 1;
  }
}
