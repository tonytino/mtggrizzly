'use client';

import * as React from 'react';
import CardsQueryContext from '@/src/app/sets/[set]/CardsQueryContext';

/**
 * Exported for testing purposes only
 */
export const clearButtonText = 'Clear';
/**
 * Exported for testing purposes only
 */
export const searchLabel = 'Search';

/**
 * Renders a search input that updates the `searchText` value of `CardsQueryContext`
 */
export function SearchFilter() {
  const { searchText, setQueries } = React.useContext(CardsQueryContext);
  const searchTextInputRef = React.useRef(null);
  const isSearchTextPresent = Boolean(searchText);

  return (
    <div className='relative flex w-full flex-col gap-2 text-slate-500 focus-within:text-sky-800 dark:text-slate-100 dark:focus-within:text-slate-100'>
      <label
        className='font-bold'
        htmlFor='card-query-input'
      >
        {searchLabel}
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
          {clearButtonText}
        </button>
      )}
    </div>
  );
}
