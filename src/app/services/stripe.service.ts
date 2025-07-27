import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private http: HttpClient) {}

  redirectToCheckout() {
    return this.http
      .post<{ id: string }>('http://localhost:4242/create-checkout-session', {})
      .pipe(
        switchMap(async (session) => {
          const stripe = await loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // Replace with your Stripe test key
          return stripe?.redirectToCheckout({ sessionId: session.id });
        }),
        from
      );
  }
}
