import * as React from 'react';
import { Set } from '@/components';
// import type { SetsResponse } from '@/types';
import sets from '@/root/src/app/api/sets/sets.json';

// async function getSets(): Promise<SetsResponse> {
//   const setsToShow = sets.filter((set) => set.show);
//   return new Promise((resolve) => {
//     resolve({
//       count: setsToShow.length,
//       sets: setsToShow,
//       types: ['core', 'expansion', 'masters'],
//     } as SetsResponse);
//   });
// }

/**
 * The Home Page
 */
async function HomePage() {
  // const { sets } = await getSets();
  const setsToShow = sets.filter((set) => set.show);

  return (
    <section className='m-auto grid h-min grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
      {setsToShow.map((set, index) => {
        return (
          <Set
            index={index}
            key={set.code}
            set={set}
          />
        );
      })}
    </section>
  );
}

export default HomePage;
