'use client';

import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useCart } from '@/components/contexts/cart/useCart';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY || '');

export default function Checkout() {
  const { cart } = useCart();

  const fetchClientSecret = useCallback(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart })
      }
    )
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
