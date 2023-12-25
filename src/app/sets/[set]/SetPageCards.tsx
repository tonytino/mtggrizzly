'use client';

import * as React from 'react';
import warning from 'warning';
import { Card } from '@/components';
import type { Card as CardType } from '@/types';
import CardsQueryContext from './CardsQueryContext';

const colorsRegex = new RegExp('[WUBRG]');

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
  const { permittedCardTypes, permittedColors, searchText } =
    React.useContext(CardsQueryContext);

  const isSearchTextPresent = Boolean(searchText?.length);
  const arePermittedCardTypesPresent = Boolean(permittedCardTypes?.length);
  const arePermittedColorsPresent = Boolean(permittedColors?.length);

  const areFiltersPresent = [
    isSearchTextPresent,
    arePermittedCardTypesPresent,
    arePermittedColorsPresent,
  ].some(Boolean);

  const filteredCards = areFiltersPresent
    ? cards.filter((card) => {
        try {
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
           * Check if the card passes the permitted card types
           */

          if (arePermittedCardTypesPresent) {
            const typeLine = hasMultipleFaces
              ? card.card_faces[0].type_line.concat(
                  card.card_faces[1].type_line
                )
              : card.type_line;

            const arePermittedCardTypesInTheTypeLine = permittedCardTypes.some(
              (permittedCardType) => {
                return typeLine.includes(permittedCardType);
              }
            );

            if (!arePermittedCardTypesInTheTypeLine) {
              return false;
            }
          }

          /**
           * Check if the card passes the permitted colors
           */

          if (arePermittedColorsPresent) {
            const manaCost = hasMultipleFaces
              ? card.card_faces[0].mana_cost.concat(
                  card.card_faces[1].mana_cost
                )
              : card.mana_cost;

            const areAnyCardColorsIncludedInTheQuery = permittedColors.some(
              (permittedColor) => {
                if (permittedColor === 'Colorless') {
                  const areAnyColorsPresent = colorsRegex.test(manaCost);

                  return !areAnyColorsPresent;
                } else {
                  return manaCost.includes(permittedColor);
                }
              }
            );

            if (!areAnyCardColorsIncludedInTheQuery) {
              return false;
            }
          }

          /**
           * If we've made it this far, the card did not fail any of the checks
           */

          return true;
        } catch (error) {
          warning(
            false,
            `
📢 An error was encountered while filtering the cards:
🔥    ${error}

💡 To see the offending card, please visit:
🌎    ${card.uri}
`
          );

          return false;
        }
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
