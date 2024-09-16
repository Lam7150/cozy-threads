import { useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useCart } from '@/components/contexts/cart-context';
import { OrderSummary } from '@/components/shared/OrderSummary';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useCart();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/checkout/complete`
      }
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <form
      id="payment-form"
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <LinkAuthenticationElement
        id="link-authentication-element"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        // options={{defaultValues: {email: 'foo@bar.com'}}}
      />
      <PaymentElement id="payment-element" />
      <OrderSummary
        total={total}
        shipping={0}
        footer={
          <Button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="w-full mt-4"
          >
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay now'
            )}
          </Button>
        }
      />
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
