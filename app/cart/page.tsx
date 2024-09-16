'use client';

import { useCart } from '@/components/contexts/cart-context';
import { Cart } from '@/components/landing/Cart';
import { OrderSummary } from '@/components/shared/OrderSummary';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <main className="container grid place-items-center">
        <div className="container px-4 py-8 mx-auto">
          <h1 className="mb-8 text-2xl font-bold">Your Shopping Cart</h1>
          <div className="flex flex-row gap-8">
            <div className="lg:w-2/3">
              <Cart editable />
            </div>
            <div className="lg:w-1/3">
              <OrderSummary
                total={total}
                shipping={0}
                footer={
                  <Link rel="noreferrer noopener" href="/checkout">
                    <Button className="w-full mt-4">Proceed to Checkout</Button>
                  </Link>
                }
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
