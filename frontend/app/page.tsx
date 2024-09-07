'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '@/frontend/components/landing/Navbar';
import { ProductGallery } from '@/frontend/components/landing/ProductGallery';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <main className="container grid place-items-center py-4">
          <ProductGallery />
        </main>
      </QueryClientProvider>
    </>
  );
}
