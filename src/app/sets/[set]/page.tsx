import * as React from 'react';
import type { Card as CardType, DraftSet } from '@/types';
import sets from '@/src/app/api/sets/sets.json';
import SetPageCards from './SetPageCards';

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
      throw new Error(
        `Over 999 cards found for query (${requestUrl}), please narrow your search.`
      );
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
  return sets.reduce((pages, set) => {
    if (set.show) {
      pages.push({
        set: set.code,
      });
    }

    return pages;
  }, []);
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
      <h1 className='text-center text-3xl font-bold text-sky-800 dark:text-slate-100'>
        {name}
      </h1>

      <SetPageCards cards={cards} />
    </React.Fragment>
  );
}

export default SetPage;
