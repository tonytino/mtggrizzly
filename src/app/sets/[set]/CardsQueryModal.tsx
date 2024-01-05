'use client';

import * as React from 'react';
// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
import CardsQueryContext from './CardsQueryContext';
import { scrollToTop } from '@/root/utils';
import {
  CardsQueryModalFooter,
  CardsQueryModalHeader,
  CardTypesFilter,
  ColorsFilter,
  OpenCardsQueryModalButton,
  SearchFilter,
} from './components';

const closeModalLabel = 'Close the search options interface';

/**
 * A modal that contains various means by which to query the cards of a set
 */
function CardsQueryModal() {
  const {
    closeModal,
    isModalOpen,
    permittedCardTypes,
    permittedColors,
    searchText,
  } = React.useContext(CardsQueryContext);

  /**
   * Scroll to the top of the page whenever the queries change
   */
  React.useEffect(
    () => scrollToTop,
    [permittedCardTypes, permittedColors, searchText]
  );

  return (
    <Dialog.Root
      modal
      open={isModalOpen}
    >
      <OpenCardsQueryModalButton />

      <Dialog.Portal>
        <Dialog.Overlay
          aria-label={closeModalLabel}
          className='fixed bottom-0 left-0 right-0 top-0 z-20 h-full w-full cursor-pointer bg-slate-900 opacity-75'
          onClick={closeModal}
        />

        <Dialog.Content
          className='fixed bottom-0 left-0 right-0 top-0 z-30 m-auto h-dvh w-screen overflow-y-auto bg-white p-4 text-sky-800 lg:h-3/4 lg:w-[800px] lg:rounded-md lg:p-8 xl:w-2/4 xl:min-w-[800px] dark:bg-slate-800 dark:text-slate-100'
          onEscapeKeyDown={closeModal}
        >
          <div className='flex h-full w-full flex-col justify-between'>
            <CardsQueryModalHeader closeModalLabel={closeModalLabel} />

            <QueryControls />

            <CardsQueryModalFooter />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * All of the controls available to filter through the set
 */
function QueryControls() {
  return (
    <div className='flex flex-grow flex-col gap-8 overflow-y-scroll pb-2 pr-2'>
      <SearchFilter />

      <CardTypesFilter />

      <ColorsFilter />
    </div>
  );
}

export default CardsQueryModal;
