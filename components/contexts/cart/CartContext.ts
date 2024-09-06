import { createContext } from 'react';
import { Product } from '@/utils/types';

interface CartContextType {
  cart: Product[];
  addItem: (item: Product) => void;
  updateItem: (id: number, quantity: number) => void;
  deleteItem: (id: number) => void;
}

const DEFAULT_CONTEXT: CartContextType = {
  cart: [],
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {}
};

export const CartContext = createContext(DEFAULT_CONTEXT);
