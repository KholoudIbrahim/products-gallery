import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/auth/login/login.component';
import { LayoutComponent } from '../app/components/layout/layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { UsersComponent } from './components/users/users/users.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
      {
        path: 'products/add',
        component: AddProductComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'products/edit/:id',
        component: EditProductComponent,
        canActivate: [AuthGuard],
      },
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'users', component: UsersComponent },

      { path: 'checkout', component: CheckoutComponent },
      { path: 'my-cart', component: MyCartComponent },

      // { path: 'success', component: SuccessComponent },
      // { path: 'cancel', component: CancelComponent },
      { path: 'cart', component: CartComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
