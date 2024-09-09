'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductGallery } from '@/components/landing/ProductGallery';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main className="container grid place-items-center py-4">
          <ProductGallery />
        </main>
      </QueryClientProvider>
    </>
  );
}
