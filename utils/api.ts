import { PRODUCTS } from '@/utils/consts/consts.products';

// MOCK API ENDPOINT USING JSON DB
const fetchProducts = async () => {
  const response = PRODUCTS;

  if (!response) {
    throw new Error('A network error occurred');
  }

  return PRODUCTS;
};

export { fetchProducts };
