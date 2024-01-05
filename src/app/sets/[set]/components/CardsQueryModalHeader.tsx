'use client';

import * as React from 'react';
// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import CardsQueryContext from '@/src/app/sets/[set]/CardsQueryContext';

/**
 * Exported for testing purposes only
 */
export const modalDescription =
  'Use the options below to search for matching cards';
/**
 * Exported for testing purposes only
 */
export const modalTitle = 'Search the Set';

type CardsQueryModalHeaderType = {
  /**
   * The label to use for the (icon) button that closes `<CardsQueryModal />`
   */
  closeModalLabel: string;
};

/**
 * Renders the title, description, and the (icon) button that closes the `<CardsQueryModal />`
 */
export function CardsQueryModalHeader(props: CardsQueryModalHeaderType) {
  const { closeModalLabel } = props;

  return (
    <div className='relative'>
      <Dialog.Title className='w-full text-2xl font-bold lg:text-center'>
        {modalTitle}
      </Dialog.Title>

      <Dialog.Close asChild>
        <CloseQueryModalIconButton closeModalLabel={closeModalLabel} />
      </Dialog.Close>

      <Dialog.Description className='py-4 text-sm md:py-6 md:text-base'>
        {modalDescription}
      </Dialog.Description>
    </div>
  );
}

type CloseQueryModalIconButtonType = CardsQueryModalHeaderType & {
  /**
   * The forwarded ref
   */
  ref: React.ForwardedRef<HTMLButtonElement>;
};

/**
 * Renders a button that supports forwarded refs for [Radix](https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-forward-ref)'s `<Dialog.Close />`
 */
const CloseQueryModalIconButton = React.forwardRef<
  HTMLButtonElement,
  CloseQueryModalIconButtonType
>(function CloseQueryModalIconButton(
  props: CloseQueryModalIconButtonType,
  ref
) {
  const { closeModalLabel } = props;
  const { closeModal } = React.useContext(CardsQueryContext);

  return (
    <button
      aria-label={closeModalLabel}
      className='absolute right-0 top-0'
      onClick={closeModal}
      ref={ref}
      type='button'
    >
      <Cross2Icon
        height='32px'
        width='32px'
      />
    </button>
  );
});
