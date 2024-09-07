'use client';

// Libraries
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/utils/api';

// Components
import { ProductCard } from '@/components/shared/ProductCard';
import { ProductSheet } from '@/components/shared/ProductSheet';

// Types
import { Product } from '@/utils/types';
import { convertJsonToProduct } from '@/utils/helpers';

export function ProductGallery() {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Product>();
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ['compliance'],
    queryFn: fetchProducts
  });

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const onProductSelect = (product: Product) => {
    setSelected(product);
    setSheetOpen(true);
  };

  const products = data?.map((item) => convertJsonToProduct(item));

  return (
    <>
      <div className="grid grid-cols-4 auto-rows-fr gap-4">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductSelect(product)}
          />
        ))}
        <ProductSheet
          product={selected}
          open={sheetOpen}
          setOpen={setSheetOpen}
        />
      </div>
    </>
  );
}
