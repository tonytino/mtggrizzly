'use client';

import * as React from 'react';
// https://www.radix-ui.com/primitives/docs/components/toggle-group
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import CardsQueryContext from '@/src/app/sets/[set]/CardsQueryContext';
import type { CardType } from '@/types/card';

/**
 * Exported for testing purposes only
 */
export const cardTypes = [
  'Artifact',
  'Battle',
  'Creature',
  'Enchantment',
  'Instant',
  'Land',
  'Planeswalker',
  'Sorcery',
  'Tribal',
];
/**
 * Exported for testing purposes only
 */
export const cardTypesLabel = 'Card Types';

/**
 * Renders toggles for each card type that update the `permittedCardTypes` value of `CardsQueryContext`
 */
export function CardTypesFilter() {
  const { permittedCardTypes, setQueries } =
    React.useContext(CardsQueryContext);

  return (
    <div className='flex flex-col gap-2 text-slate-500 focus-within:text-sky-800 dark:text-slate-100 dark:focus-within:text-slate-100'>
      <label
        className='font-bold'
        htmlFor='selected-card-types'
      >
        {cardTypesLabel}
      </label>

      <ToggleGroup.Root
        aria-label='Select the card types to include'
        className='flex w-full flex-wrap gap-2 pl-2 text-slate-600 focus-within:text-slate-600 md:gap-4'
        defaultValue={[]}
        onValueChange={(values) => {
          setQueries((queries) => {
            return {
              ...queries,
              permittedCardTypes: values,
            };
          });
        }}
        type='multiple'
        value={permittedCardTypes}
      >
        {cardTypes.map((cardType) => {
          return (
            <ToggleGroup.Item
              className={`rounded p-2 ${
                permittedCardTypes.includes(cardType as CardType)
                  ? 'bg-sky-800 text-slate-100'
                  : 'bg-slate-200'
              }`}
              key={cardType}
              value={cardType}
            >
              {cardType}
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </div>
  );
}
