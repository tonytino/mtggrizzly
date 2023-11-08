import type { Card } from './';
import type { Set } from './sets';

/**
 * Derivative of https://scryfall.com/docs/api/cards/search
 */
export type DraftSet = {
  /**
   * Number of (draftable) cards present in the Set
   * @example 0
   */
  card_count: number;
  /**
   * Cards in the set
   */
  cards: Card[];
  /**
   * The Set object
   */
  set: Set;
};
