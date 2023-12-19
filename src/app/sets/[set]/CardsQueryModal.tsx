'use client';

import * as React from 'react';
// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
// https://www.radix-ui.com/primitives/docs/components/tooltip
import * as Tooltip from '@radix-ui/react-tooltip';
import { Cross2Icon, MixerVerticalIcon } from '@radix-ui/react-icons';

const openModalTooltipLabel = 'Query the cards';

/**
 * A modal that contains various means by which to query the cards of a set
 */
function CardsQueryModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog.Root
      modal
      open={isOpen}
    >
      <Dialog.Trigger asChild>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              aria-label='Open the query options'
              className='fixed bottom-8 right-8 h-20 w-20 rounded-full bg-sky-800 text-slate-100 shadow-xl dark:bg-slate-50 dark:text-sky-800'
              onClick={() => setIsOpen((isOpen) => !isOpen)}
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
            aria-label={openModalTooltipLabel}
            className='mb-2 rounded bg-sky-800 p-2 text-sm text-slate-100 shadow-xl dark:bg-slate-50 dark:text-sky-800'
          >
            {openModalTooltipLabel}
          </Tooltip.Content>
        </Tooltip.Root>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className='fixed bottom-0 left-0 right-0 top-0 z-20 h-full w-full cursor-pointer bg-slate-900 opacity-75'
          onClick={() => setIsOpen(false)}
        />

        <Dialog.Content className='fixed bottom-0 left-0 right-0 top-0 z-30 m-auto h-screen w-screen rounded-md bg-white p-8 text-sky-800 dark:bg-slate-800 dark:text-slate-100 lg:h-3/4 lg:w-3/4'>
          <Dialog.Title className='w-full text-2xl font-bold lg:text-center'>
            Query the Set
          </Dialog.Title>

          <Dialog.Close asChild>
            <button
              aria-label='Close the query options'
              className='absolute right-8 top-8'
              onClick={() => setIsOpen(false)}
              type='button'
            >
              <Cross2Icon
                height='32px'
                width='32px'
              />
            </button>
          </Dialog.Close>

          <Dialog.Description className='pt-4 text-lg'>
            Use the options below to peruse the set
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default CardsQueryModal;
