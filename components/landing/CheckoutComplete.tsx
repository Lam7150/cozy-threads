'use client';

import React, { useEffect, useState } from 'react';
import { usePayment } from '@/components/contexts/payment-context';

export function CheckoutComplete() {
  const [messageBody, setMessageBody] = useState<React.ReactNode>('');
  const { stripePromise } = usePayment();

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location as unknown as string);
      const clientSecret =
        url.searchParams.get('payment_intent_client_secret') || '';
      const { error, paymentIntent } =
        await stripe.retrievePaymentIntent(clientSecret);

      setMessageBody(
        error ? (
          `> ${error.message}`
        ) : (
          <>
            &gt; Payment {paymentIntent.status}:{' '}
            <a
              href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {paymentIntent.id}
            </a>
          </>
        )
      );
    });
  }, [stripePromise]);

  return (
    <>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: 'block' } : {}}
      >
        {messageBody}
      </div>
    </>
  );
}

export default CheckoutComplete;
