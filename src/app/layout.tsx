import './globals.css';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import Footer from './Footer';
import Header from './Header';
import Providers from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MTG Grizzly',
  description: 'Your Source for Augmenting Your Limited Gameplay',
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang='en'>
        <body className={inter.className}>
          <Header />

          <main className='mx-auto flex min-h-screen w-full flex-col items-center justify-between px-4 pb-8 lg:pb-16'>
            <div className='left-0 mt-20 flex h-full w-full flex-col items-center justify-start xl:mt-24 xl:max-w-screen-xl'>
              {children}
            </div>
          </main>

          <Footer />

          <SpeedInsights />
        </body>
      </html>
    </Providers>
  );
}

export default RootLayout;
