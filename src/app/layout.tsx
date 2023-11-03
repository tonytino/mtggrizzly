import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      id='test'
      lang='en'
    >
      <body className={inter.className}>
        <main className='flex min-h-screen w-full flex-col items-center justify-between px-4 pb-10'>
          <div className='fixed left-0 top-0 z-50 h-16 w-full bg-slate-800 shadow-lg	'>
            <h1 className='p-4 pl-8 text-3xl font-bold'>MTG Grizzly</h1>
          </div>

          <div className='left-0 mt-20 flex h-full w-full flex-col items-center justify-start gap-4 overflow-y-auto from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto'>
            {children}
          </div>
        </main>

        <Analytics />
      </body>
    </html>
  );
}
