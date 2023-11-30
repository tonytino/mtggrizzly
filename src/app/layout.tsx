import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import Footer from './Footer';
import Header from './Header';
import Providers from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MTG Grizzly',
  description: 'Your Source for Augmenting Your Limited Gameplay',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang='en'>
        <body className={inter.className}>
          <Header />

          <main className='mx-auto flex min-h-screen w-full flex-col items-center justify-between px-4 pb-10'>
            <div className='left-0 mt-16 flex h-full w-full flex-col items-center justify-start gap-4 xl:max-w-screen-xl'>
              {children}
            </div>
          </main>

          <Footer />

          <Analytics />
        </body>
      </html>
    </Providers>
  );
}
