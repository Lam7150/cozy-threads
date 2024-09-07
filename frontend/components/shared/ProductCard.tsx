import { MouseEventHandler } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/utils/types';

interface ProductCardProps {
  product: Product;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { image, title, description, price } = product;

  return (
    <Card
      className="overflow-hidden w-full max-w-sm hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={`image of ${title}`}
          sizes="25vw"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className="transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <p className="mb-4 text-sm text-gray-600">{description}</p>
        <p className="text-lg font-bold text-green-400">{price}</p>
      </CardContent>
    </Card>
  );
}
