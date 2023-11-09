'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import type { Set } from '@/types';

type SetSelectProps = {
  /**
   * The Sets to select from
   */
  sets: Set[];
};

/**
 * Renders a select element and a button to load the cards for that set
 *
 * @example
 * <SetSelect />
 */
export function SetSelect(props: SetSelectProps) {
  const router = useRouter();
  const { sets = [] } = props;

  const [selectedSetCode, setSelectedSetCode] = React.useState('');

  return (
    <section className='flex flex-col gap-2'>
      <label htmlFor='set-select'>Choose a set:</label>

      <select
        className='cursor-pointer p-2 text-black'
        name='sets'
        id='set-select'
        value={selectedSetCode}
        onChange={(event) => {
          setSelectedSetCode(event.target.value);
        }}
      >
        <option value=''>Select A Set</option>

        {sets.map(({ code, name }) => {
          return (
            <option
              key={code}
              value={code}
            >
              {name}
            </option>
          );
        })}
      </select>

      <button
        aria-disabled={!selectedSetCode}
        className={`cursor-pointer rounded border-2 border-solid border-indigo-600 p-2 ${
          !selectedSetCode && 'cursor-not-allowed'
        }`}
        disabled={!selectedSetCode}
        onClick={() => router.push(`/sets/${selectedSetCode}`)}
      >
        Go
      </button>
    </section>
  );
}
