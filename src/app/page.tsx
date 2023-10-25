import * as React from 'react';
import { SetSelect } from '@/components';

/**
 * The Home Page
 */
function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='w-full max-w-5xl text-sm'>
        <div className='fixed bottom-0 left-0 flex h-48 w-full flex-col items-center justify-center gap-4 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
          <h1 className='text-3xl font-bold'>MTG Grizzly</h1>

          <h2 className='text-3xl font-semibold'>
            Select a set to get started:
          </h2>

          <SetSelect />
        </div>
      </div>
    </main>
  );
}

export default Home;
