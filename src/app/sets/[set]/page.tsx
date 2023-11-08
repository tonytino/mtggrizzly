import { headers } from 'next/headers';
import * as React from 'react';
import { Card } from '@/components';
import type { DraftSet } from '@/types';

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
  const { name, code } = setDetails;

  return (
    <React.Fragment>
      <h1 className='text-3xl font-bold'>
        {name} ({code.toUpperCase()})
      </h1>

      <section className='m-auto grid h-min w-full grid-cols-1 place-content-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {cards.map((card, index) => {
          return (
            <Card
              card={card}
              isPriority={index < 9}
              key={card.name}
            />
          );
        })}
      </section>
    </React.Fragment>
  );
}

export default SetPage;
