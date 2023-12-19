'use client';

import * as React from 'react';
// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
// https://www.radix-ui.com/primitives/docs/components/tooltip
import * as Tooltip from '@radix-ui/react-tooltip';
import { Cross2Icon, MixerVerticalIcon } from '@radix-ui/react-icons';
import CardsQueryContext from './CardsQueryContext';

const openModalTooltipLabel = 'Query the cards';
const cancelChangesLabel = 'Cancel the changes to the query options';

/**
 * A modal that contains various means by which to query the cards of a set
 */
function CardsQueryModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  const { searchText, setQueries } = React.useContext(CardsQueryContext);
  const searchTextInputRef = React.useRef(null);

  const isSearchTextPresent = Boolean(searchText);

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
          aria-label={openModalTooltipLabel}
          className='mb-2 rounded bg-sky-800 p-2 text-sm text-slate-100 shadow-xl dark:bg-slate-50 dark:text-sky-800'
        >
          {openModalTooltipLabel}
        </Tooltip.Content>
      </Tooltip.Root>

      <Dialog.Portal>
        <Dialog.Overlay
          aria-label={cancelChangesLabel}
          className='fixed bottom-0 left-0 right-0 top-0 z-20 h-full w-full cursor-pointer bg-slate-900 opacity-75'
          onClick={() => setIsOpen(false)}
        />

        <Dialog.Content className='fixed bottom-0 left-0 right-0 top-0 z-30 m-auto h-screen w-screen bg-white p-4 text-sky-800 dark:bg-slate-800 dark:text-slate-100 lg:h-3/4 lg:w-3/4 lg:rounded-md lg:p-8'>
          <div className='flex h-full w-full flex-col justify-between'>
            <div>
              <Dialog.Title className='w-full text-2xl font-bold lg:text-center'>
                Query the Set
              </Dialog.Title>

              <Dialog.Close asChild>
                <CloseQueryOptionsButton onClick={() => setIsOpen(false)} />
              </Dialog.Close>

              <Dialog.Description className='py-8 text-lg'>
                Use the options below to peruse the set
              </Dialog.Description>

              <div className='relative flex min-w-full flex-col items-start gap-2 text-slate-500 focus-within:text-sky-800 dark:text-slate-100 dark:focus-within:text-slate-100 md:min-w-[22rem]'>
                <label
                  className='w-full font-bold'
                  htmlFor='card-query-input'
                >
                  Search
                </label>

                <input
                  className='w-full rounded-lg border-2 border-slate-200 p-2 px-4 dark:border-transparent dark:text-sky-700'
                  name='card-query-input'
                  onChange={(event) =>
                    setQueries((queries) => {
                      return {
                        ...queries,
                        searchText: event.target.value,
                      };
                    })
                  }
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
            </div>

            <div className='flex flex-col justify-between gap-4 lg:flex-row-reverse'>
              <button
                aria-label='Save the query options'
                className='w-[calc(100vw-2rem)] rounded-md bg-sky-700 py-4 text-center text-xl font-semibold text-slate-100 hover:bg-sky-600 dark:bg-slate-200 dark:text-sky-800 dark:hover:bg-slate-100 dark:hover:text-sky-600 lg:w-[var(--Set--width-desktop)]'
                onClick={() => setIsOpen(false)}
                type='button'
              >
                Save
              </button>

              <button
                aria-label={cancelChangesLabel}
                className='w-[calc(100vw-2rem)] rounded-md bg-slate-600 py-4 text-center text-xl font-semibold text-slate-100 hover:bg-slate-500 dark:bg-slate-200 dark:text-sky-800 dark:hover:bg-slate-100 dark:hover:text-sky-600 lg:w-[var(--Set--width-desktop)]'
                onClick={() => setIsOpen(false)}
                type='button'
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default CardsQueryModal;

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
      <MixerVerticalIcon
        className='m-auto text-white dark:text-sky-800'
        height='32px'
        width='32px'
      />
    </button>
  );
});

type CloseQueryOptionsButtonType = {
  /**
   * Function that sets the query options modal to closed
   */
  onClick: () => void;
  /**
   * The forwarded ref for [Radix](https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-forward-ref)
   */
  ref: React.ForwardedRef<HTMLButtonElement>;
};

const CloseQueryOptionsButton = React.forwardRef(
  function CloseQueryOptionsButton(
    props: CloseQueryOptionsButtonType,
    forwardedRef
  ) {
    return (
      <button
        aria-label={cancelChangesLabel}
        className='absolute right-4 top-4 lg:right-8 lg:top-8'
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
  }
);
