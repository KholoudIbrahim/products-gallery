import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ProductService } from 'src/app/services/product.service';
// import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  loading = true;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadProduct();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue(product);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load product';
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const updatedProduct: Product = {
      id: this.productId,
      ...this.productForm.value,
    };

    this.productService
      .updateProduct(this.productId, updatedProduct)
      .subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => (this.error = 'Failed to update product'),
      });
  }
}
