import type { Card } from '@/types';

/**
 * Reports whether the card provided has multiple faces
 * @param card A Card from a Set
 * @returns boolean
 */
export function isMultifaceCard(card: Card) {
  return Boolean(card?.card_faces?.length);
}
