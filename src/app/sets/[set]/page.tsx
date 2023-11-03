import { headers } from 'next/headers';
import Image from 'next/image';
import * as React from 'react';
import type { DraftSet, SetsResponse } from '@/types';

/**
 * @TODO
 * @todo
 * Move this request to /api/set/[set] and include in the response
 */
async function getSets(): Promise<SetsResponse> {
  const reqHeaders = headers();
  const host = reqHeaders.get('host') ?? 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const res = await fetch(`${protocol}://${host}/api/sets`);

  if (!res.ok) {
    throw new Error('Failed to fetch sets data');
  }

  return res.json();
}

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
  const { sets } = await getSets();
  const { cards } = await getSet(set);

  const setName = sets.find(({ code }) => code === set)?.name ?? 'Weird...';

  return (
    <React.Fragment>
      <h1 className='text-3xl font-bold'>
        {setName} ({set?.toUpperCase()})
      </h1>

      <section className='m-auto grid h-min w-full grid-cols-1 place-content-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {cards.map(({ card_faces = [], image_uris = {}, name }, index) => {
          const { border_crop } = image_uris ?? {};

          const isMultiFaceCard = card_faces.length;
          let cardImageSrc = border_crop;

          if (isMultiFaceCard) {
            cardImageSrc =
              card_faces[0]?.image_uris?.border_crop ?? border_crop;
          }

          return (
            <div
              className='flex cursor-pointer flex-col items-center justify-between text-center'
              key={name}
            >
              <div className='relative mx-auto my-2 flex-col items-center justify-center rounded-lg border-2 border-black bg-black shadow-md hover:border-teal-400'>
                <Image
                  className='rounded-lg border-4 border-black'
                  alt={name}
                  src={cardImageSrc}
                  height={680}
                  width={488}
                  priority={index < 4}
                />
              </div>

              <p className='my-auto text-lg font-medium text-slate-800 dark:text-slate-50'>
                {name}
              </p>
            </div>
          );
        })}
      </section>
    </React.Fragment>
  );
}

export default SetPage;
