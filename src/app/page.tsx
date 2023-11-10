import * as React from 'react';
import { Set } from '@/components';
import type { SetsResponse } from '@/types';
import sets from '@/root/src/app/api/sets/sets.json';

async function getSets(): Promise<SetsResponse> {
  try {
    const host = process.env.HOST ?? 'mtggrizzly.vercel.app';
    const protocol = process.env.PROTOCOL ?? 'https';
    const res = await fetch(`${protocol}://${host}/api/sets`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (_) {
    return new Promise((resolve) => {
      resolve({
        count: sets.length,
        sets,
      } as SetsResponse);
    });
  }
}

/**
 * The Home Page
 */
async function HomePage() {
  const { sets } = await getSets();

  return (
    <section className='m-auto grid h-min grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
      {sets.map((set, index) => {
        if (index > 8) return null;

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
