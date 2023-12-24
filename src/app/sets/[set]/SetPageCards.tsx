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
  const { searchText } = React.useContext(CardsQueryContext);

  const isSearchTextPresent = Boolean(searchText);

  const filteredCards = isSearchTextPresent
    ? cards.filter((card) => {
        const hasMultipleFaces = Boolean(card?.card_faces?.length);
        const aspectsToCheck = hasMultipleFaces
          ? [
              card.card_faces[0].oracle_text,
              card.card_faces[0].name,
              card.card_faces[0].type_line,
              card.card_faces[1].oracle_text,
              card.card_faces[1].name,
              card.card_faces[1].type_line,
            ]
          : [card.oracle_text, card.name, card.type_line];

        return aspectsToCheck.some((aspect) =>
          aspect.toLowerCase().includes(searchText.toLowerCase())
        );
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
