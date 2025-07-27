import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  @Input() isVisible = false;

  product: Omit<Product, 'id' | 'rating'> = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  };

  showToast = false;
  imageError = false;

  constructor(private productService: ProductService) {}

  submit(): void {
    this.productService.createProduct(this.product as Product).subscribe({
      next: () => {
        this.showToast = true;
        this.resetForm();
      },
      error: (err) => {
        alert('❌ Failed to add product');
        console.error(err);
      },
    });
  }

  resetForm(): void {
    this.product = {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
    };
    this.imageError = false;

    // Hide toast after delay
    setTimeout(() => (this.showToast = false), 3000);
  }

  close(): void {
    this.isVisible = false;
  }
}
