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

      <section className='m-auto grid h-min grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
        {sets.map(({ code, icon_svg_uri, name, preview_art }, index) => {
          const buttonColors = MAGIC_COLORS[index % 5];
          const isSetNameVeryLong = name?.length > 28;
          return (
            <button
              className={`flex h-64 w-80 cursor-pointer flex-col items-end justify-between rounded border-transparent text-center shadow-md lg:h-72 lg:w-96 ${buttonColors} bg-cover bg-clip-border bg-center`}
              key={code}
              onClick={() => router.push(`/sets/${code}`)}
              style={{
                backgroundImage: `url(${preview_art})`,
              }}
              tabIndex={0}
            >
              <div className='relative my-2 ml-auto mr-4 h-1/4 w-14 flex-col items-center justify-center pr-2'>
                <Image
                  alt='Set Icon'
                  fill
                  sizes='100%'
                  src={icon_svg_uri}
                  style={{
                    filter:
                      'invert(100%) sepia(0%) saturate(2%) hue-rotate(54deg) brightness(105%) contrast(101%)',
                  }}
                />
              </div>

              <p
                className={`mb-0 mt-auto h-1/4 w-full bg-black bg-opacity-50 p-2 leading-loose ${
                  isSetNameVeryLong ? 'text-base' : 'text-lg'
                } font-medium text-slate-100`}
                style={isSetNameVeryLong ? { paddingTop: '11.5px' } : {}}
              >
                {name}
              </p>
            </button>
          );
        })}
      </section>
    </React.Fragment>
  );
}
