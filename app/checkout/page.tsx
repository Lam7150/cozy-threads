import { Cart } from '@/components/landing/Cart';
import { Payment } from '@/components/landing/Payment';

export default function CheckoutPage() {
  return (
    <main className="container grid place-items-center">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-2xl font-bold">Checkout</h1>
        <div className="flex flex-row gap-8">
          <div className="lg:w-1/2">
            <Cart />
          </div>
          <div className="lg:w-1/2">
            <Payment />
          </div>
        </div>
      </div>
    </main>
  );
}
