import { headers } from 'next/headers';
import * as React from 'react';
import { Card } from '@/components';
import type { DraftSet } from '@/types';
import sets from '@/src/app/api/sets/sets.json';

async function getSet(set: string): Promise<DraftSet> {
  const reqHeaders = headers();
  const host = reqHeaders.get('host') ?? 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const res = await fetch(`${protocol}://${host}/api/set/${set}`);

  if (!res.ok) {
    throw new Error('Failed to fetch set data');
  }

  return res.json();
}

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
export async function generateStaticParams() {
  return sets.map((set) => ({
    set: set.code,
  }));
}

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true;

/**
 * The Set Page
 */
async function SetPage({
  params, // searchParams,
}: {
  params: { set: string };
  // searchParams: { name: string };
}) {
  const { set } = params;
  const { cards, set: setDetails } = await getSet(set);
  const { name } = setDetails;

  return (
    <React.Fragment>
      <h1 className='mb-4 text-3xl font-bold text-sky-800 dark:text-slate-100 xl:mb-8'>
        {name}
      </h1>

      <div className='m-auto grid h-min w-full grid-cols-1 place-content-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8'>
        {cards.map((card, index) => {
          return (
            <Card
              card={card}
              isPriority={index < 9}
              key={card.name}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default SetPage;
