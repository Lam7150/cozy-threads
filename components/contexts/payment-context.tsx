'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren
} from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { fetchStripePK } from '@/utils/api';

// Context
interface IPaymentContext {
  stripePromise: Promise<Stripe> | null;
  error: Error | null;
}

const DEFAULT_CONTEXT: IPaymentContext = {
  stripePromise: null,
  error: null
};

export const PaymentContext = createContext(DEFAULT_CONTEXT);

export const PaymentProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchStripePK()
      .then((publishableKey) => {
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const value = {
    stripePromise,
    error
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

// Hook
export const usePayment = () => {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }

  return context;
};
