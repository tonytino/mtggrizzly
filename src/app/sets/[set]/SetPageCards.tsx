'use client';

import * as React from 'react';
import { Card } from '@/components';
import type { Card as CardType } from '@/types';

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
  const [query, setQuery] = React.useState('');

  const isQueryPresent = Boolean(query.length);

  const filteredCards = isQueryPresent
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
          aspect.toLowerCase().includes(query.toLowerCase())
        );
      })
    : cards;

  return (
    <React.Fragment>
      <div className='relative mx-auto my-4 flex min-w-full flex-col items-start gap-2 text-slate-500 focus-within:text-sky-800 dark:text-slate-100 dark:focus-within:text-slate-100 md:min-w-[22rem]'>
        <label
          className='w-full font-bold'
          htmlFor='card-query-input'
        >
          Search
          {isQueryPresent && (
            <span className='float-right'>Hits: {filteredCards.length}</span>
          )}
        </label>

        <input
          className='w-full rounded-lg border-2 border-slate-200 p-2 px-4 dark:border-transparent dark:text-sky-700'
          name='card-query-input'
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Storm...'
          type='text'
          value={query}
        />

        {isQueryPresent && (
          <button
            className='absolute bottom-[calc(0.5rem+2px)] right-4 dark:text-sky-700'
            onClick={() => setQuery('')}
            type='button'
          >
            Clear
          </button>
        )}
      </div>

      <div className='m-auto grid h-min w-full grid-cols-1 place-content-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8'>
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
