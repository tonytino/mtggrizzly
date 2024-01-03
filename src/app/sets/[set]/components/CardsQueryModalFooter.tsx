'use client';

import * as React from 'react';

/**
 * Exported for testing purposes only
 */
export const closeButtonText =
  'Use the options below to search for matching cards';
/**
 * Exported for testing purposes only
 */
export const resetButtonText = 'Reset';

type CardsQueryModalFooterType = {
  /**
   * The label to use for the button that closes `<CardsQueryModal />`
   */
  closeModalLabel: string;
  /**
   * Function that clears the queries of `<CardsQueryContext />`
   */
  onClear: () => void;
  /**
   * Function that sets the status of `<CardsQueryModal />` to "closed"
   */
  onClose: () => void;
};

/**
 * Renders the reset and close buttons at the bottom of `<CardsQueryModal />`
 */
export function CardsQueryModalFooter(props: CardsQueryModalFooterType) {
  const { closeModalLabel, onClear, onClose } = props;
  return (
    <div className='flex flex-col justify-between gap-4 pt-4 md:flex-row-reverse md:gap-8 landscape:flex-row-reverse'>
      <button
        aria-label={closeModalLabel}
        className='h-14 w-[calc(100vw-2rem)] rounded-md bg-sky-700 text-center text-xl font-semibold text-slate-100 hover:bg-sky-600 lg:w-[var(--Set--width-desktop)] dark:bg-slate-200 dark:text-sky-800 dark:hover:bg-slate-100 dark:hover:text-sky-600'
        onClick={onClose}
        type='button'
      >
        {closeButtonText}
      </button>

      <button
        aria-label='Reset the search options'
        className='h-14 w-[calc(100vw-2rem)] rounded-md border-4 border-slate-500 text-center text-xl font-semibold text-slate-500 hover:border-red-500 hover:text-red-500 focus:border-red-500 focus:text-red-500 lg:w-[var(--Set--width-desktop)] dark:border-slate-400 dark:text-slate-400 dark:hover:border-red-500 dark:focus:border-red-500'
        onClick={() => {
          if (window.confirm('Are you sure you want to reset everything?')) {
            onClear();
          }
        }}
        type='button'
      >
        {resetButtonText}
      </button>
    </div>
  );
}
