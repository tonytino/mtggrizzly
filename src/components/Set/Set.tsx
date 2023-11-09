'use client';
import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Set } from '@/types';

const convertSVGToWhite =
  'invert(100%) sepia(0%) saturate(2%) hue-rotate(54deg) brightness(105%) contrast(101%)';

const MAGIC_COLORS = {
  0: 'bg-neutral-50 border-neutral-50 dark:bg-white dark:border-white', // white
  1: 'bg-blue-300 border-blue-300', // blue
  2: 'bg-neutral-300 border-neutral-300 dark:bg-neutral-400 dark:border-neutral-400', // black
  3: 'bg-red-300 border-red-300', // red
  4: 'bg-green-300 border-green-300', // green
};

type SetProps = {
  /**
   * The index of the set, used to apply a fallback background color
   */
  index: number;
  /**
   * The Set to render
   */
  set: Set;
};

/**
 * Placeholder
 *
 * @example
 * <Set />
 */
export function Set(props: SetProps) {
  const router = useRouter();
  const { index, set } = props;
  const { code, icon_svg_uri, name, preview_art } = set;

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
            filter: convertSVGToWhite,
          }}
        />
      </div>

      <p
        className={`mb-0 mt-auto h-1/4 w-full bg-black bg-opacity-50 p-2 leading-loose ${
          isSetNameVeryLong ? 'text-base' : 'text-lg'
        } font-medium text-slate-100`}
        style={isSetNameVeryLong ? { paddingTop: '11px' } : {}}
      >
        {name}
      </p>
    </button>
  );
}
