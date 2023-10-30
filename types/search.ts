import type { Card } from './';

/**
 * https://scryfall.com/docs/api/cards/search
 */
export type ScryfallSearchResponse = {
  /**
   * The Cards found using the search query
   */
  data: Card[];
  /**
   * Whether there are additional Cards to fetch
   */
  has_more: boolean;
  /**
   * The URL to use for fetching the next page of results
   */
  next_page?: string;
  /**
   * What kind of object is found under the "data" key
   */
  object: string;
  /**
   * The total number of Cards
   */
  total_cards: string[];
};
