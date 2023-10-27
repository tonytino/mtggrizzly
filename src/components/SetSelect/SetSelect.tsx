'use client';
import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Set } from '@/types';

const MAGIC_COLORS = {
  0: 'bg-neutral-50 border-neutral-50 dark:bg-white dark:border-white', // white
  1: 'bg-blue-300 border-blue-300', // blue
  2: 'bg-neutral-300 border-neutral-300 dark:bg-neutral-400 dark:border-neutral-400', // black
  3: 'bg-red-300 border-red-300', // red
  4: 'bg-green-300 border-green-300', // green
};

type SetSelectProps = {
  /**
   * Collection of Sets to select from
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
  const { sets = [] } = props;
  const router = useRouter();
  const [selectedSetCode, setSelectedSetCode] = React.useState('');

  return (
    <React.Fragment>
      <section className='flex w-80 flex-col gap-2 hover:border-teal-400'>
        <label htmlFor='set-select'>Choose a set:</label>

        <select
          className='p-2 text-black'
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
          className='rounded border-2 border-solid border-indigo-600 p-2'
          onClick={() => router.push(`/sets/${selectedSetCode}`)}
        >
          Go
        </button>
      </section>

      <section className='m-auto grid h-min w-full grid-cols-1 place-content-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {sets.map(({ code, icon_svg_uri, name }, index) => {
          const buttonColors = MAGIC_COLORS[index % 5];
          return (
            <button
              className={`flex h-44 w-72 cursor-pointer flex-col items-center justify-between rounded border-2 p-4 text-center shadow-md hover:border-teal-400 ${buttonColors}`}
              tabIndex={0}
              onClick={() => router.push(`/sets/${code}`)}
              key={code}
            >
              <div className='relative mx-auto my-2 h-14 w-14 flex-col items-center justify-center'>
                <Image
                  alt='Set Icon'
                  src={icon_svg_uri}
                  fill
                  sizes='100%'
                />
              </div>

              <p className='my-auto text-lg font-medium text-slate-800'>
                {name}
              </p>
            </button>
          );
        })}
      </section>
    </React.Fragment>
  );
}
