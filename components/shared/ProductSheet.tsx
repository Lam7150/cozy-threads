'use client';

// Libraries
import { useState } from 'react';
import { useCart } from '@/components/contexts/cart/useCart';

// Components
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

// Types
import type { Product } from '@/utils/types';

interface ProductSheetProps {
  product: Product | undefined;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function ProductSheet({ product, open, setOpen }: ProductSheetProps) {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const { addItem } = useCart();

  const { title, description, image, price } = product;

  const addItemToCart = () => {
    addItem({
      ...product,
      quantity
    });

    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-[400px] sm:w-[540px] sm:max-w-[100vw]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="relative w-full aspect-square">
            <Image
              src={image}
              alt="Product Image"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className="rounded-md"
            />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Description</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Price</h3>
            <p className="text-2xl font-bold text-green-600">{price}</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Quantity</h3>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20"
            />
          </div>
          <Button className="w-full" onClick={addItemToCart}>
            Add to Cart
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
