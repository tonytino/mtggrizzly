import { NextResponse } from 'next/server';
import type { Card, ScryfallSearchResponse } from '@/types';

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
    const { set } = params;

    if (!set) {
      throw new Error('Set must be specified.');
    }

    const query = `set:${set}+is:booster`;

    let requestUrl = `${SEARCH_API}?order=review&q=${query}`;
    let hasMore = true;
    const cards: Card[] = [];

    while (hasMore) {
      if (cards.length > 999) {
        throw new Error('Over 999 cards found, please narrow your search');
      }

      const res = await fetch(requestUrl);
      const data: ScryfallSearchResponse = await res.json();

      const { data: pageOfCards, has_more, next_page } = data;

      cards.push(...pageOfCards);
      hasMore = has_more;
      if (hasMore) requestUrl = next_page;
    }

    return Response.json({
      count: cards.length,
      cards,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: err },
      { status: 500 }
    );
  }
}
