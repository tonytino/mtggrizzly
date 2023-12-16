'use client';

// https://www.radix-ui.com/primitives/docs/components/tooltip
import * as Tooltip from '@radix-ui/react-tooltip';
import { MixerVerticalIcon } from '@radix-ui/react-icons';

const label = 'Query the cards';

/**
 * Opens the query options dialog for filtering and sorting the set cards
 */
export default function OpenQueryOptionsButton() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          className='fixed bottom-8 right-8 h-20 w-20 rounded-full bg-sky-800 text-slate-100 shadow-xl dark:bg-slate-50 dark:text-sky-800'
          onClick={() => alert('clicked')}
          type='button'
        >
          <MixerVerticalIcon
            className='m-auto text-white dark:text-sky-800'
            height='32px'
            width='32px'
          />
        </button>
      </Tooltip.Trigger>

      <Tooltip.Content
        aria-label={label}
        className='mb-2 rounded bg-sky-800 p-2 text-sm text-slate-100 shadow-xl dark:bg-slate-50 dark:text-sky-800'
      >
        {label}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
