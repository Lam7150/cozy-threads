import { Product } from '@/utils/types';

// MOCK API ENDPOINT USING JSON DB
const fetchProducts = async () => {
  const response = await fetch(`/products.json`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('A network error occurred');
  }

  return response.json();
};

// Stripe endpoints
const fetchClientSecret = (cart: Product[]) => {
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
};

const fetchSessionStatus = async (sessionId: string | null) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/session-status?session_id=${sessionId}`
  );

  if (!response.ok) {
    throw new Error('A network error occurred');
  }

  return response.json();
};

export { fetchProducts, fetchClientSecret, fetchSessionStatus };
