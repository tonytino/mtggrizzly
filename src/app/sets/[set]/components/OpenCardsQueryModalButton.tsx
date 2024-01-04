'use client';

import * as React from 'react';
// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
// https://www.radix-ui.com/primitives/docs/components/tooltip
import * as Tooltip from '@radix-ui/react-tooltip';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import CardsQueryContext from '@/src/app/sets/[set]/CardsQueryContext';

/**
 * Exported for testing purposes only
 */
export const buttonLabel = 'Open the query options';
const buttonTooltipLabel = 'Search within the set';

/**
 * Opens the `<CardsQueryModal />`
 */
export function OpenCardsQueryModalButton() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Dialog.Trigger asChild>
          <DialogTriggerButton />
        </Dialog.Trigger>
      </Tooltip.Trigger>

      <Tooltip.Content
        align='start'
        alignOffset={22}
        aria-label={buttonTooltipLabel}
        className='mb-2 rounded bg-sky-800 p-2 text-sm text-slate-100 shadow-xl dark:bg-slate-50 dark:text-sky-800'
        side='left'
        sideOffset={12}
      >
        {buttonTooltipLabel}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

type DialogTriggerButtonType = {
  /**
   * The forwarded ref
   */
  ref: React.ForwardedRef<HTMLButtonElement>;
};

/**
 * Renders a button that supports forwarded refs for [Radix](https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-forward-ref)'s `<Dialog.Trigger />`
 */
const DialogTriggerButton = React.forwardRef<
  HTMLButtonElement,
  DialogTriggerButtonType
>(function DialogTriggerButton(props: DialogTriggerButtonType, ref) {
  const { openModal } = React.useContext(CardsQueryContext);

  return (
    <button
      aria-label={buttonLabel}
      className='fixed bottom-8 right-8 h-20 w-20 rounded-full bg-sky-800 text-slate-100 shadow-xl dark:bg-slate-50 dark:text-sky-800'
      onClick={openModal}
      ref={ref}
      type='button'
    >
      <MixerHorizontalIcon
        className='m-auto text-white dark:text-sky-800'
        height='32px'
        width='32px'
      />
    </button>
  );
});
