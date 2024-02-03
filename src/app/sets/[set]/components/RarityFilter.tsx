'use client';

import * as React from 'react';
// https://www.radix-ui.com/primitives/docs/components/toggle-group
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import CardsQueryContext, {
  PermittedRarities,
} from '@/src/app/sets/[set]/CardsQueryContext';

/**
 * Exported for testing purposes only
 */
export const rarities = {
  Common: 'common',
  Uncommon: 'uncommon',
  Rare: 'rare',
  Mythic: 'mythic',
};
/**
 * Exported for testing purposes only
 */
export const rarityLabel = 'Rarity';

/**
 * Renders toggles for each rarity that update the `permittedRarities` value of `CardsQueryContext`
 */
export function RarityFilter() {
  const { permittedRarities, setPermittedRarities } =
    React.useContext(CardsQueryContext);

  return (
    <div className='flex flex-col gap-2 text-slate-500 focus-within:text-sky-800 dark:text-slate-100 dark:focus-within:text-slate-100'>
      <label className='font-bold'>{rarityLabel}</label>

      <ToggleGroup.Root
        aria-label='Select the rarities to include'
        className='flex w-full flex-wrap gap-2 pl-2 text-slate-600 focus-within:text-slate-600 md:gap-4'
        defaultValue={[]}
        onValueChange={(values) =>
          setPermittedRarities(values as PermittedRarities[])
        }
        type='multiple'
        value={permittedRarities}
      >
        {Object.keys(rarities).map((label) => {
          const value = rarities[label];

          return (
            <ToggleGroup.Item
              className={`rounded p-2 ${
                permittedRarities.includes(value)
                  ? 'bg-sky-800 text-slate-100'
                  : 'bg-slate-200'
              }`}
              key={label}
              value={value}
            >
              {label}
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </div>
  );
}
