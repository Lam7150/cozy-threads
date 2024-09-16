'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '@/components/contexts/cart-context';
import { usePayment } from '@/components/contexts/payment-context';
import { createPaymentIntent } from '@/utils/api';
import CheckoutForm from '@/components/landing/CheckoutForm';

export function Payment() {
  const [clientSecret, setClientSecret] = useState('');
  const { stripePromise } = usePayment();
  const { cart } = useCart();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent(cart).then((clientSecret) =>
      setClientSecret(clientSecret)
    );
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
