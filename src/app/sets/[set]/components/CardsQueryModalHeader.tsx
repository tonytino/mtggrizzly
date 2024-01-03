'use client';

import * as React from 'react';
// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

type CardsQueryModalHeaderType = {
  /**
   * The label to use for the (icon) button that closes `<CardsQueryModal />`
   */
  closeModalLabel: string;
  /**
   * Function that sets the status of `<CardsQueryModal />` to "closed"
   */
  onClose: () => void;
};

/**
 * Renders the title, description, and the (icon) button that closes the `<CardsQueryModal />`
 */
export function CardsQueryModalHeader(props: CardsQueryModalHeaderType) {
  const { closeModalLabel, onClose } = props;

  return (
    <div className='relative'>
      <Dialog.Title className='w-full text-2xl font-bold lg:text-center'>
        Search the Set
      </Dialog.Title>

      <Dialog.Close asChild>
        <CloseQueryModalIconButton
          closeModalLabel={closeModalLabel}
          onClose={onClose}
        />
      </Dialog.Close>

      <Dialog.Description className='py-4 text-sm md:py-6 md:text-base'>
        Use the options below to search for matching cards
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
  const { closeModalLabel, onClose } = props;

  return (
    <button
      aria-label={closeModalLabel}
      className='absolute right-0 top-0'
      onClick={onClose}
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
