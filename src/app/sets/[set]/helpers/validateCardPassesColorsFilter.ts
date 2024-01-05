import type { Card } from '@/types';
import { PermittedColors } from '@/src/app/sets/[set]/CardsQueryContext';
import { isMultifaceCard } from './';

const colorsRegex = new RegExp('[WUBRG]');

/**
 * Reports whether the card provided is of a permitted color
 * @param card A Card from a Set
 * @param permittedColors The permitted card colors
 * @returns boolean
 */
export function validateCardPassesColorsFilter(
  card: Card,
  permittedColors: PermittedColors[]
) {
  const hasMultipleFaces = isMultifaceCard(card);

  const manaCost = hasMultipleFaces
    ? card.card_faces[0].mana_cost.concat(card.card_faces[1].mana_cost)
    : card.mana_cost;

  const arePermittedColorsInTheCard = permittedColors.some((permittedColor) => {
    if (permittedColor === 'Colorless') {
      const areAnyColorsPresent = colorsRegex.test(manaCost);

      return !areAnyColorsPresent;
    } else {
      return manaCost.includes(permittedColor);
    }
  });

  return arePermittedColorsInTheCard;
}
