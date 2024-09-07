import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/frontend/components/contexts/cart/CartProvider';
import '@/styles/main.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Cozy Threads',
  description:
    'A demo application for an e-commerce website called Cozy Threads'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
