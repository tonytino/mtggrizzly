import type { Card, CardType } from '@/types/card';
import { isMultifaceCard } from './';

/**
 * Reports whether the card provided is of a permitted card type
 * @param card A Card from a Set
 * @param permittedCardTypes The permitted card types
 * @returns boolean
 */
export function validateCardPassesCardTypesFilter(
  card: Card,
  permittedCardTypes: CardType[]
) {
  const hasMultipleFaces = isMultifaceCard(card);

  const typeLine = hasMultipleFaces
    ? card.card_faces[0].type_line.concat(card.card_faces[1].type_line)
    : card.type_line;

  const arePermittedCardTypesInTheTypeLine = permittedCardTypes.some(
    (permittedCardType) => {
      return typeLine.includes(permittedCardType);
    }
  );

  return arePermittedCardTypesInTheTypeLine;
}
