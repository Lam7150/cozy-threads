import { Navbar } from '@/components/landing/Navbar';
import { fetchProducts } from '@/utils/api';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container grid place-items-center">
        <div>hello, world</div>
      </main>
    </>
  );
}
