'use client';

import * as React from 'react';
import warning from 'warning';
import { Card } from '@/components';
import type { Card as CardType } from '@/types';
import CardsQueryContext from './CardsQueryContext';
import {
  validateCardPassesCardTypesFilter,
  validateCardPassesColorsFilter,
  validateCardPassesSearchTextFilter,
} from './helpers';

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
          if (isSearchTextPresent) {
            if (!validateCardPassesSearchTextFilter(card, searchText)) {
              return false;
            }
          }

          if (arePermittedCardTypesPresent) {
            if (!validateCardPassesCardTypesFilter(card, permittedCardTypes)) {
              return false;
            }
          }

          if (arePermittedColorsPresent) {
            if (!validateCardPassesColorsFilter(card, permittedColors)) {
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

  if (!filteredCards.length) {
    return (
      <p className='my-auto py-12 text-center text-xl text-sky-800 dark:text-slate-100'>
        No cards match the current query params.
      </p>
    );
  }

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
