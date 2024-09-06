import React, { useState, useEffect } from 'react';

import { CartContext } from '@/components/contexts/cart/CartContext';
import { Product } from '@/utils/types';

type PropsWithChildren = {
  children?: React.ReactNode;
};

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addItem = (item: Product) => {
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
