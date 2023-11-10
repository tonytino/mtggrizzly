import { NextResponse } from 'next/server';
import type { Card, ScryfallSearchResponse } from '@/types';
import type { Set } from '@/types';
import sets from './../../sets/sets.json';

const knownErrors = {
  missingSet: 'Set must be specified.',
  unknownSet: 'Set code supplied is unrecognized.',
};

/**
 * [Search Syntax](https://scryfall.com/docs/syntax#sets)
 *
 * [Search API](https://scryfall.com/docs/api/cards/search)
 */
const SEARCH_API = 'https://api.scryfall.com/cards/search';

/**
 * Returns a collection of Cards present in the specified Set
 */
export async function GET(_: Request, { params }: { params: { set: string } }) {
  try {
    const { set: setCodeReceived } = params;

    if (!setCodeReceived) {
      throw new Error(knownErrors.missingSet);
    }

    const setObject: Set = (sets as Set[]).find(({ code }) => {
      return code === setCodeReceived;
    });

    if (!setObject) {
      throw new Error(knownErrors.unknownSet);
    }

    const query = `set:${setCodeReceived}+is:booster`;

    let requestUrl = `${SEARCH_API}?order=review&q=${query}`;
    let hasMore = true;
    const cards: Card[] = [];

    while (hasMore) {
      if (cards.length > 999) {
        throw new Error('Over 999 cards found, please narrow your search');
      }

      try {
        const res = await fetch(requestUrl);

        const data: ScryfallSearchResponse = await res.json();

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

    return Response.json({
      count: cards.length,
      cards,
      set: setObject,
    });
  } catch ({ message }) {
    if (Object.values(knownErrors).includes(message)) {
      return NextResponse.json(
        { error: 'Bad request', message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error', message },
      { status: 500 }
    );
  }
}
