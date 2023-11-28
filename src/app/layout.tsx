import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MTG Grizzly',
  description: 'Your Source for Augmenting Your Limited Gameplay',
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
        <header>
          <div className='fixed left-0 right-0 top-0 z-50 w-screen bg-white shadow-sm dark:bg-slate-800'>
            <nav className='mx-auto flex h-16 w-full items-baseline justify-between p-4 xl:max-w-screen-xl'>
              <div>
                <h1 className='text-3xl font-bold text-slate-800 dark:text-slate-100'>
                  <Link href='/'>MTG Grizzly</Link>
                </h1>
              </div>

              <div className='flex gap-6 lg:gap-12'>
                <h2 className='text-xl font-bold text-slate-800 dark:text-slate-100'>
                  <Link href='/sets'>Sets</Link>
                </h2>

                <h2 className='text-xl font-bold text-slate-800 dark:text-slate-100'>
                  <Link href='/about'>About</Link>
                </h2>
              </div>
            </nav>
          </div>
        </header>

        <main
          className={`flex min-h-screen flex-col items-center justify-between pb-10 ${WIDTH_CONSTRAINTS}`}
        >
          <div className='left-0 mt-16 flex h-full w-full flex-col items-center justify-start gap-4'>
            {children}
          </div>
        </main>

        <footer className='flex h-60 w-screen flex-col items-center justify-end gap-4 bg-gradient-to-b from-white from-0% to-slate-300 px-8 py-16 text-center dark:from-slate-800 dark:to-slate-950'>
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
  );
}
