import { ProductGallery } from '@/components/landing/ProductGallery';

export default function HomePage() {
  return (
    <>
      <main className="container grid py-4 place-items-center">
        <ProductGallery />
      </main>
    </>
  );
}
