import * as React from 'react';
import { Card } from '@/components';
import type { Card as CardType, DraftSet } from '@/types';
import sets from '@/src/app/api/sets/sets.json';

/**
 * [Search Syntax](https://scryfall.com/docs/syntax#sets)
 *
 * [Search API](https://scryfall.com/docs/api/cards/search)
 */
const SEARCH_API = 'https://api.scryfall.com/cards/search';

async function getSet(setCode: string): Promise<DraftSet> {
  const setDetails = sets.find((set) => set.code === setCode);

  const query = `set:${setCode}+is:booster`;

  let requestUrl = `${SEARCH_API}?order=review&q=${query}`;
  let hasMore = true;
  const cards: CardType[] = [];

  while (hasMore) {
    if (cards.length > 999) {
      throw new Error('Over 999 cards found, please narrow your search');
    }

    try {
      const res = await fetch(requestUrl);

      const data = await res.json();

      if (data.object === 'error') {
        console.error(data);
        throw new Error('An error was encountered.');
      }

      const { data: pageOfCards, has_more, next_page } = data;

      cards.push(...pageOfCards);
      hasMore = has_more;
      if (hasMore) requestUrl = next_page;
    } catch (error) {
      hasMore = false;
    }
  }

  return {
    count: cards.length,
    cards,
    set: setDetails,
  };
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
  const { set: setCode } = params;
  const {
    cards,
    set: { name },
  } = await getSet(setCode);

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
