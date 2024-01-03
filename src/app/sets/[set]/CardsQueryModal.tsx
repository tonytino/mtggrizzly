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
// https://www.radix-ui.com/primitives/docs/components/tooltip
import * as Tooltip from '@radix-ui/react-tooltip';
import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import CardsQueryContext from './CardsQueryContext';
import { scrollToTop } from '@/root/utils';
import type { CardType } from '@/types/card';

const openModalTooltipLabel = 'Search within the set';
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
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    clearQueries,
    permittedCardTypes,
    permittedColors,
    searchText,
    setQueries,
  } = React.useContext(CardsQueryContext);
  const searchTextInputRef = React.useRef(null);

  const isSearchTextPresent = Boolean(searchText);

  /**
   * Scroll to the top of the page whenever the queries change
   */
  React.useEffect(
    () => scrollToTop,
    [permittedCardTypes, permittedColors, searchText]
  );

  const onClose = React.useCallback(() => setIsOpen(false), []);

  return (
    <Dialog.Root
      modal
      open={isOpen}
    >
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Dialog.Trigger asChild>
            <OpenQueryOptionsButton onClick={() => setIsOpen(true)} />
          </Dialog.Trigger>
        </Tooltip.Trigger>

        <Tooltip.Content
          align='start'
          alignOffset={22}
          aria-label={openModalTooltipLabel}
          className='mb-2 rounded bg-sky-800 p-2 text-sm text-slate-100 shadow-xl dark:bg-slate-50 dark:text-sky-800'
          side='left'
          sideOffset={12}
        >
          {openModalTooltipLabel}
        </Tooltip.Content>
      </Tooltip.Root>

      <Dialog.Portal>
        <Dialog.Overlay
          aria-label={closeModalLabel}
          className='fixed bottom-0 left-0 right-0 top-0 z-20 h-full w-full cursor-pointer bg-slate-900 opacity-75'
          onClick={onClose}
        />

        <Dialog.Content
          className='fixed bottom-0 left-0 right-0 top-0 z-30 m-auto h-dvh w-screen overflow-y-auto bg-white p-4 text-sky-800 lg:h-3/4 lg:w-[800px] lg:rounded-md lg:p-8 xl:w-2/4 xl:min-w-[800px] dark:bg-slate-800 dark:text-slate-100'
          onEscapeKeyDown={onClose}
        >
          <div className='flex h-full w-full flex-col justify-between'>
            <CardsQueryModalHeader onClose={onClose} />

            <div
              className='flex flex-grow flex-col gap-8 overflow-y-scroll pb-2 pr-2'
              id='query-controls'
            >
              <div className='relative flex w-full flex-col gap-2 text-slate-500 focus-within:text-sky-800 dark:text-slate-100 dark:focus-within:text-slate-100'>
                <label
                  className='font-bold'
                  htmlFor='card-query-input'
                >
                  Search
                </label>

                <input
                  className='w-[calc(100%-0.5rem] ml-2 rounded-lg border-2 border-slate-200 p-2 px-4 dark:border-transparent dark:text-sky-700'
                  name='card-query-input'
                  onChange={(event) => {
                    setQueries((queries) => {
                      return {
                        ...queries,
                        searchText: event.target.value,
                      };
                    });
                  }}
                  placeholder='Storm...'
                  ref={searchTextInputRef}
                  type='text'
                  value={searchText}
                />

                {isSearchTextPresent && (
                  <button
                    className='absolute bottom-2 right-4 rounded px-2 py-0.5 hover:bg-slate-100 dark:text-sky-700'
                    onClick={() => {
                      setQueries((queries) => {
                        return {
                          ...queries,
                          searchText: '',
                        };
                      });
                      searchTextInputRef.current.focus();
                    }}
                    type='button'
                  >
                    Clear
                  </button>
                )}
              </div>

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

            <CardsQueryModalFooter
              onClear={() => clearQueries()}
              onClose={onClose}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type CardsQueryModalHeaderType = {
  /**
   * Function that sets the query options modal to closed
   */
  onClose: () => void;
};

function CardsQueryModalHeader(props: CardsQueryModalHeaderType) {
  return (
    <div className='relative'>
      <Dialog.Title className='w-full text-2xl font-bold lg:text-center'>
        Search the Set
      </Dialog.Title>

      <Dialog.Close asChild>
        <CloseQueryOptionsIcon onClick={props.onClose} />
      </Dialog.Close>

      <Dialog.Description className='py-4 text-sm md:py-6 md:text-base'>
        Use the options below to search for matching cards
      </Dialog.Description>
    </div>
  );
}

type CardsQueryModalFooterType = {
  /**
   * Function that sets the query options modal to closed
   */
  onClose: () => void;
  /**
   * Function that sets the query options modal to closed
   */
  onClear: () => void;
};

function CardsQueryModalFooter(props: CardsQueryModalFooterType) {
  return (
    <div className='flex flex-col justify-between gap-4 pt-4 md:flex-row-reverse md:gap-8 landscape:flex-row-reverse'>
      <button
        aria-label={closeModalLabel}
        className='h-14 w-[calc(100vw-2rem)] rounded-md bg-sky-700 text-center text-xl font-semibold text-slate-100 hover:bg-sky-600 lg:w-[var(--Set--width-desktop)] dark:bg-slate-200 dark:text-sky-800 dark:hover:bg-slate-100 dark:hover:text-sky-600'
        onClick={props.onClose}
        type='button'
      >
        Close
      </button>

      <button
        aria-label='Reset the search options'
        className='h-14 w-[calc(100vw-2rem)] rounded-md border-4 border-slate-500 text-center text-xl font-semibold text-slate-500 hover:border-red-500 hover:text-red-500 focus:border-red-500 focus:text-red-500 lg:w-[var(--Set--width-desktop)] dark:border-slate-400 dark:text-slate-400 dark:hover:border-red-500 dark:focus:border-red-500'
        onClick={() => {
          if (window.confirm('Are you sure you want to reset everything?')) {
            props.onClear();
          }
        }}
        type='button'
      >
        Reset
      </button>
    </div>
  );
}

type CloseQueryOptionsIconType = {
  /**
   * Function that sets the query options modal to closed
   */
  onClick: () => void;
  /**
   * The forwarded ref for [Radix](https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-forward-ref)
   */
  ref: React.ForwardedRef<HTMLButtonElement>;
};

const CloseQueryOptionsIcon = React.forwardRef(function CloseQueryOptionsIcon(
  props: CloseQueryOptionsIconType,
  forwardedRef
) {
  return (
    <button
      aria-label={closeModalLabel}
      className='absolute right-0 top-0'
      onClick={props.onClick}
      ref={forwardedRef}
      type='button'
      {...props}
    >
      <Cross2Icon
        height='32px'
        width='32px'
      />
    </button>
  );
});

type OpenQueryOptionsButtonType = {
  /**
   * Function that sets the query options modal to open
   */
  onClick: () => void;
  /**
   * The forwarded ref for [Radix](https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-forward-ref)
   */
  ref: React.ForwardedRef<HTMLButtonElement>;
};

const OpenQueryOptionsButton = React.forwardRef(function OpenQueryOptionsButton(
  props: OpenQueryOptionsButtonType,
  forwardedRef
) {
  return (
    <button
      aria-label='Open the query options'
      className='fixed bottom-8 right-8 h-20 w-20 rounded-full bg-sky-800 text-slate-100 shadow-xl dark:bg-slate-50 dark:text-sky-800'
      onClick={props.onClick}
      ref={forwardedRef}
      type='button'
      {...props}
    >
      <MixerHorizontalIcon
        className='m-auto text-white dark:text-sky-800'
        height='32px'
        width='32px'
      />
    </button>
  );
});

export default CardsQueryModal;
