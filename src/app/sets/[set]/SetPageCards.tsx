'use client';

import * as React from 'react';
import { Card } from '@/components';
import type { Card as CardType } from '@/types';
import CardsQueryContext from './CardsQueryContext';

type SetPageCardsType = {
  /**
   * The cards for the given set
   */
  cards: CardType[];
};

/**
 * The Cards for a given Set
 */
function SetPageCards(props: SetPageCardsType) {
  const { cards } = props;
  const { permittedColors, searchText } = React.useContext(CardsQueryContext);

  const isSearchTextPresent = Boolean(searchText?.length);
  const arePermittedColorsPresent = Boolean(permittedColors?.length);

  const areFiltersPresent = [
    isSearchTextPresent,
    arePermittedColorsPresent,
  ].some(Boolean);

  const filteredCards = areFiltersPresent
    ? cards.filter((card) => {
        const hasMultipleFaces = Boolean(card?.card_faces?.length);

        /**
         * Check if the card passes the search text
         */

        if (isSearchTextPresent) {
          const searchTextAspects = hasMultipleFaces
            ? [
                card.card_faces[0].oracle_text,
                card.card_faces[0].name,
                card.card_faces[0].type_line,
                card.card_faces[1].oracle_text,
                card.card_faces[1].name,
                card.card_faces[1].type_line,
              ]
            : [card.oracle_text, card.name, card.type_line];

          const matchesSearchText = searchTextAspects.some((aspect) =>
            aspect.toLowerCase().includes(searchText.toLowerCase())
          );

          if (!matchesSearchText) {
            return false;
          }
        }

        /**
         * Check if the card passes the permitted colors
         */

        if (arePermittedColorsPresent) {
          console.log('yes');
          const cardColors = hasMultipleFaces
            ? [...card.card_faces[0].colors, ...card.card_faces[1].colors]
            : card.colors;

          const someCardColorsIncludedInQuery = permittedColors.some(
            (permittedColor) => {
              if (permittedColor === 'Colorless') {
                // If the card is colorless, and we want colorless cards
                // included, it'll have an empty array for its colors property
                return cardColors.length === 0;
              } else {
                return cardColors.includes(permittedColor);
              }
            }
          );

          if (!someCardColorsIncludedInQuery) {
            return false;
          }
        }

        // If we've made it this far, the card did not fail any of the checks
        return true;
      })
    : cards;

  return (
    <React.Fragment>
      <div className='m-auto mt-4 grid h-min w-full grid-cols-1 place-content-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8'>
        {filteredCards.map((card, index) => {
          return (
            <Card
              card={card}
              isPriority={index < 9}
              key={card.name}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default SetPageCards;
