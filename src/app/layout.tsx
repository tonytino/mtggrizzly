import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
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

        <footer className='flex h-96 w-screen flex-col items-center justify-end gap-4 bg-slate-100 px-8 py-16 text-center dark:bg-slate-900'>
          <p className='text-md text-slate-600 dark:text-slate-100 md:text-lg'>
            Thanks for using MTG Grizzly!
          </p>

          <p className='md:text-md text-center text-sm leading-8 text-slate-600 dark:text-slate-100'>
            Special thanks to&nbsp;
            <a
              className='text-md font-semibold text-slate-600 dark:text-slate-500 md:text-lg'
              href='https://scryfall.com/'
              rel='noreferrer'
              target='_blank'
            >
              Scryfall
            </a>
            &nbsp;and&nbsp;
            <a
              className='text-md font-semibold text-slate-600 dark:text-slate-500 md:text-lg'
              href='https://magic.wizards.com/'
              rel='noreferrer'
              target='_blank'
            >
              Wizards of the Coast
            </a>
            &nbsp; for making this project possible.
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
    </Providers>
  );
}
