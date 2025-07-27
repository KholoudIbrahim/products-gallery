import { Component } from '@angular/core';
// import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  checkout(): void {
    alert('Checkout submitted! (You can integrate Stripe here)');
    // TODO: Implement real checkout logic or Stripe integration
  }
}
