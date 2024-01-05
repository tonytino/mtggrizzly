import type { Card } from '@/types';
import { isMultifaceCard } from './';

/**
 * Reports whether the card provided has the desired text
 * @param card A Card from a Set
 * @param searchText The desired text on the card
 * @returns boolean
 */
export function validateCardPassesSearchTextFilter(
  card: Card,
  searchText: string
) {
  const hasMultipleFaces = isMultifaceCard(card);

  const searchTextAspects = hasMultipleFaces
    ? [
        card.card_faces[0].name,
        card.card_faces[0].oracle_text,
        card.card_faces[0].type_line,
        card.card_faces[1].name,
        card.card_faces[1].oracle_text,
        card.card_faces[1].type_line,
      ]
    : [card.name, card.oracle_text, card.type_line];

  const hasMatchingText = searchTextAspects.some((aspect) =>
    aspect.toLowerCase().includes(searchText.toLowerCase())
  );

  return hasMatchingText;
}
