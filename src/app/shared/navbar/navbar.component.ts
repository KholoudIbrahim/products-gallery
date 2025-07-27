import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  darkMode = false;
  totalItems = 0;
  cartCount = 0;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount =
        cart?.products.reduce((sum, p) => sum + p.quantity, 0) || 0;
    });
  }
}
