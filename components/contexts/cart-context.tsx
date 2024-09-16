'use client';

import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren
} from 'react';
import { Product } from '@/utils/types';

// Context
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

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addItem = (item: Product) => {
    const existingItem = cart.filter((curr) => curr.id === item.id)[0];
    if (existingItem) {
      updateItem(item.id, existingItem.quantity + item.quantity);
      return;
    }

    const newCart = [...cart, item];

    setCart(newCart);
  };

  const updateItem = (id: number, quantity: number) => {
    const newCart = cart.map((item) => {
      if (item.id !== id) {
        return item;
      }

      // update item quantity if matching id
      return {
        ...item,
        quantity
      };
    });

    setCart(newCart);
  };

  const deleteItem = (id: number) => {
    const newCart = [...cart].filter((item) => item.id !== id);

    setCart(newCart);
  };

  const value = {
    cart,
    addItem,
    updateItem,
    deleteItem
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
