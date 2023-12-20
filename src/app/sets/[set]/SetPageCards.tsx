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

  // const searchTextInputRef = React.useRef(null);

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
      {/* <div className='relative mx-auto my-8 flex min-w-full flex-col items-start gap-2 text-slate-500 focus-within:text-sky-800 dark:text-slate-100 dark:focus-within:text-slate-100 md:min-w-[22rem]'>
        <label
          className='w-full font-bold'
          htmlFor='card-query-input'
        >
          Search
          {isSearchTextPresent && (
            <span className='float-right'>Hits: {filteredCards.length}</span>
          )}
        </label>

        <input
          className='w-full rounded-lg border-2 border-slate-200 p-2 px-4 dark:border-transparent dark:text-sky-700'
          name='card-query-input'
          onChange={(event) =>
            setQueries((queries) => {
              return {
                ...queries,
                searchText: event.target.value,
              };
            })
          }
          placeholder='Storm...'
          ref={searchTextInputRef}
          type='text'
          value={searchText}
        />

        {isSearchTextPresent && (
          <button
            className='absolute bottom-2 right-4 rounded px-2 py-0.5 hover:bg-slate-100 dark:text-sky-700'
            onClick={() => {
              setQueries((queries) => {
                return {
                  ...queries,
                  searchText: '',
                };
              });
              searchTextInputRef.current.focus();
            }}
            type='button'
          >
            Clear
          </button>
        )}
      </div> */}

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
