import * as React from 'react';
import Link from 'next/link';
import { Set } from '@/components';
import sets from '@/src/app/api/sets/sets.json';

/**
 * The Home Page
 */
async function HomePage() {
  const setsToShow = sets.filter((set) => set.show);

  return (
    <React.Fragment>
      <section className='mt-[-2rem] h-fit w-screen bg-gradient-to-b from-sky-500 to-indigo-500 py-12 text-center lg:py-16'>
        <h3 className='mb-4 text-2xl font-bold text-slate-100 md:text-4xl'>
          Welcome to MTG Grizzly
        </h3>

        <h4 className='mb-12 text-lg font-bold text-slate-100 md:text-2xl'>
          Your Source for Augmenting Your Limited Gameplay
        </h4>

        <div className='m-auto flex h-min max-w-5xl flex-col flex-wrap items-center justify-center gap-8 px-4 sm:flex-row lg:justify-between'>
          <div className='flex h-fit w-60 flex-col justify-evenly gap-8'>
            <p className='text-md font-semibold text-slate-100 md:text-lg'>
              Review and search the cards in a set with ease
            </p>

            <span className='text-4xl md:text-5xl'>🔍</span>
          </div>

          <div className='flex h-fit w-60 flex-col justify-between gap-8'>
            <p className='text-md font-semibold text-slate-100 md:text-lg'>
              Find advantageous insights using advance filters
            </p>

            <span className='text-4xl md:text-5xl'>🏆</span>
          </div>

          <div className='flex h-fit w-60 flex-col justify-between gap-8'>
            <p className='text-md font-semibold text-slate-100 md:text-lg'>
              Learn about each set before you draft it
            </p>

            <span className='text-4xl md:text-5xl'>📚</span>
          </div>
        </div>
      </section>

      <div>
        <div className='m-auto grid h-min grid-cols-1 gap-8 py-8 md:grid-cols-2 xl:grid-cols-3'>
          {setsToShow.map((set, index) => {
            if (index > 8) return;

            return (
              <Set
                key={set.code}
                set={set}
              />
            );
          })}
        </div>

        <Link
          className='mx-auto block w-[var(--Set--width-mobile)] rounded-md bg-sky-700 py-4 text-center text-xl font-semibold text-slate-100 hover:bg-sky-600 lg:mt-8 lg:w-[var(--Set--width-desktop)] dark:bg-slate-200 dark:text-sky-800 dark:hover:bg-slate-100 dark:hover:text-sky-600'
          href='/sets'
        >
          All Sets
        </Link>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
