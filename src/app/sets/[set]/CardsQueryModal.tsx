/**
 * This file will be refactored as part of issue #68
 *
 * https://github.com/tonytino/mtggrizzly/issues/68
 */

'use client';

import * as React from 'react';
// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
// https://www.radix-ui.com/primitives/docs/components/toggle-group
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import CardsQueryContext from './CardsQueryContext';
import { scrollToTop } from '@/root/utils';
import type { CardType } from '@/types/card';
import {
  CardsQueryModalFooter,
  CardsQueryModalHeader,
  OpenCardsQueryModalButton,
  SearchFilter,
} from './components';

const closeModalLabel = 'Close the search options interface';
const cardTypes = [
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
 * A modal that contains various means by which to query the cards of a set
 */
function CardsQueryModal() {
  const {
    closeModal,
    isModalOpen,
    permittedCardTypes,
    permittedColors,
    searchText,
    setQueries,
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

            <div
              className='flex flex-grow flex-col gap-8 overflow-y-scroll pb-2 pr-2'
              id='query-controls'
            >
              <SearchFilter />

              <div className='flex flex-col gap-2 text-slate-500 focus-within:text-sky-800 dark:text-slate-100 dark:focus-within:text-slate-100'>
                <label
                  className='font-bold'
                  htmlFor='selected-card-types'
                >
                  Card Types
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

              <div className='flex flex-col gap-2 text-slate-500 focus-within:text-sky-800 dark:text-slate-100 dark:focus-within:text-slate-100'>
                <label
                  className='font-bold'
                  htmlFor='selected-colors'
                >
                  Colors
                </label>

                <ToggleGroup.Root
                  aria-label='Select the colors to include'
                  className='flex w-full flex-wrap gap-2 pl-2 text-slate-600 focus-within:text-slate-600 md:gap-4'
                  defaultValue={[]}
                  onValueChange={(values) => {
                    setQueries((queries) => {
                      return {
                        ...queries,
                        permittedColors: values,
                      };
                    });
                  }}
                  type='multiple'
                  value={permittedColors}
                >
                  <ToggleGroup.Item
                    className={`rounded p-2 ${
                      permittedColors.includes('W')
                        ? 'bg-sky-800 text-slate-100'
                        : 'bg-slate-200'
                    }`}
                    value='W'
                  >
                    White
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    className={`rounded p-2 ${
                      permittedColors.includes('U')
                        ? 'bg-sky-800 text-slate-100'
                        : 'bg-slate-200'
                    }`}
                    value='U'
                  >
                    Blue
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    className={`rounded p-2 ${
                      permittedColors.includes('B')
                        ? 'bg-sky-800 text-slate-100'
                        : 'bg-slate-200'
                    }`}
                    value='B'
                  >
                    Black
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    className={`rounded p-2 ${
                      permittedColors.includes('R')
                        ? 'bg-sky-800 text-slate-100'
                        : 'bg-slate-200'
                    }`}
                    value='R'
                  >
                    Red
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    className={`rounded p-2 ${
                      permittedColors.includes('G')
                        ? 'bg-sky-800 text-slate-100'
                        : 'bg-slate-200'
                    }`}
                    value='G'
                  >
                    Green
                  </ToggleGroup.Item>

                  <ToggleGroup.Item
                    className={`rounded p-2 ${
                      permittedColors.includes('Colorless')
                        ? 'bg-sky-800 text-slate-100'
                        : 'bg-slate-200'
                    }`}
                    value='Colorless'
                  >
                    Colorless
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
            </div>

            <CardsQueryModalFooter />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default CardsQueryModal;
