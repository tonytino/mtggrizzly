import type { Card } from '@/types';
import { PermittedRarities } from '@/src/app/sets/[set]/CardsQueryContext';

/**
 * Reports whether the card provided is of a permitted rarity
 * @param card A Card from a Set
 * @param permittedRarities The permitted card rarities
 * @returns boolean
 */
export function validateCardPassesRarityFilter(
  card: Card,
  permittedRarities: PermittedRarities[]
) {
  const { rarity } = card;

  return permittedRarities.includes(rarity as PermittedRarities);
}
