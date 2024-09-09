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
import { FaCartShopping } from 'react-icons/fa6';

// Types
import type { Product } from '@/utils/types';

interface ProductSheetProps {
  product: Product | undefined;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function ProductSheet({ product, open, setOpen }: ProductSheetProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem } = useCart();

  if (!product) return null;

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
      <SheetContent className="w-[400px] sm:w-[540px] sm:max-w-[100vw] overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-1 mt-6 space-y-6">
          <div className="relative w-full aspect-square">
            <Image
              src={image}
              alt={`image of ${title}`}
              sizes="25vw"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className="rounded-md"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Price</h3>
            <p className="text-xl font-bold text-primary">{price}</p>
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
          <Button className="gap-2 w-full" onClick={addItemToCart}>
            <FaCartShopping />
            Add to Cart
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
