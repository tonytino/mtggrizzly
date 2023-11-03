import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const WIDTH_CONSTRAINTS = 'mx-auto px-4 w-full xl:max-w-screen-xl';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main
          className={`flex min-h-screen flex-col items-center justify-between pb-10 ${WIDTH_CONSTRAINTS}`}
        >
          <div className='fixed left-0 top-0 z-50 h-16 w-full bg-white shadow-sm dark:bg-slate-800'>
            <h1 className={`py-4 text-3xl font-bold ${WIDTH_CONSTRAINTS}`}>
              <Link href='/'>MTG Grizzly</Link>
            </h1>
          </div>

          <div className='left-0 mt-20 flex h-full w-full flex-col items-center justify-start gap-4 overflow-y-auto'>
            {children}
          </div>
        </main>

        <Analytics />
      </body>
    </html>
  );
}
