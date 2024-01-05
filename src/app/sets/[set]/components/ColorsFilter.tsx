'use client';

import * as React from 'react';
// https://www.radix-ui.com/primitives/docs/components/toggle-group
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import CardsQueryContext, {
  PermittedColors,
} from '@/src/app/sets/[set]/CardsQueryContext';

/**
 * Exported for testing purposes only
 */
export const colors = {
  White: 'W',
  Blue: 'U',
  Black: 'B',
  Red: 'R',
  Green: 'G',
  Colorless: 'Colorless',
};
/**
 * Exported for testing purposes only
 */
export const colorsLabel = 'Colors';

/**
 * Renders toggles for each color that update the `permittedColors` value of `CardsQueryContext`
 */
export function ColorsFilter() {
  const { permittedColors, setPermittedColors } =
    React.useContext(CardsQueryContext);

  return (
    <div className='flex flex-col gap-2 text-slate-500 focus-within:text-sky-800 dark:text-slate-100 dark:focus-within:text-slate-100'>
      <label
        className='font-bold'
        htmlFor='selected-colors'
      >
        {colorsLabel}
      </label>

      <ToggleGroup.Root
        aria-label='Select the colors to include'
        className='flex w-full flex-wrap gap-2 pl-2 text-slate-600 focus-within:text-slate-600 md:gap-4'
        defaultValue={[]}
        onValueChange={(values) =>
          setPermittedColors(values as PermittedColors[])
        }
        type='multiple'
        value={permittedColors}
      >
        {Object.keys(colors).map((label) => {
          const value = colors[label];

          return (
            <ToggleGroup.Item
              className={`rounded p-2 ${
                permittedColors.includes(value)
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
