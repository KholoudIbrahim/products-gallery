import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Cart, CartProduct } from '../shared/models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'https://fakestoreapi.com/carts';
  private cartSubject = new BehaviorSubject<Cart>({
    userId: 0,
    date: new Date().toISOString(),
    products: [],
  });

  constructor(private http: HttpClient) {}
  /**
   * An observable of the currently active cart.
   * This is a subject that is updated whenever the cart changes,
   * and emits the latest value on subscription.
   */
  get cart$(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  loadAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.baseUrl);
  }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/${id}`);
  }

  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.baseUrl, cart);
  }

  updateCart(cartId: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.baseUrl}/${cartId}`, cart);
  }
  deleteCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${cartId}`);
  }

  loadCartByUserId(userId: number): void {
    this.http
      .get<Cart[]>(this.baseUrl)
      .pipe(
        map((carts) => {
          const latest = carts
            .filter((c) => c.userId === userId)
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )[0];
          return latest;
        })
      )
      .subscribe((cart) => {
        if (cart) {
          this.cartSubject.next(cart);
        } else {
          // No existing cart → initialize an empty one
          const emptyCart: Cart = {
            userId,
            date: new Date().toISOString(),
            products: [],
          };
          this.cartSubject.next(emptyCart);
        }
      });
  }

  addToCart(productId: number): void {
    const cart = this.cartSubject.value;
    const existing = cart.products.find((p) => p.productId === productId);
    if (existing) {
      existing.quantity++;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }
    cart.date = new Date().toISOString();
    this.cartSubject.next({ ...cart });
  }

  updateQuantity(productId: number, quantity: number): void {
    const cart = this.cartSubject.value;
    const product = cart.products.find((p) => p.productId === productId);
    if (product) {
      product.quantity = quantity;
      if (product.quantity <= 0) {
        cart.products = cart.products.filter((p) => p.productId !== productId);
      }
    }
    cart.date = new Date().toISOString();
    this.cartSubject.next({ ...cart });
  }
}
