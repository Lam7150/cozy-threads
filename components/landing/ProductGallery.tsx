'use client';

// Libraries
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/utils/api';

// Components
import { ProductCard } from '@/components/shared/ProductCard';

// Types
import { Product } from '@/utils/types';
import { convertJsonToProduct } from '@/utils/helpers';

export function ProductGallery() {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ['compliance'],
    queryFn: fetchProducts
  });

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const products = data?.map((item) => convertJsonToProduct(item));

  return (
    <>
      <div className="grid grid-cols-4 auto-rows-fr gap-4">
        {products?.map((product) => <ProductCard product={product} />)}
      </div>
    </>
  );
}
