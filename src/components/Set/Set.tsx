// Disabled this rule as we'd easily blow through the image optimiziation budget
// https://vercel.com/docs/limits/usage#image-optimization
/* eslint-disable @next/next/no-img-element */

import * as React from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import type { Set } from '@/types';

const convertSVGToWhite =
  'invert(100%) sepia(0%) saturate(2%) hue-rotate(54deg) brightness(105%) contrast(101%)';

type SetProps = {
  /**
   * The Set to render
   */
  set: Set;
};

/**
 * Renders a Set as a button that uses a random (from the set) card's art as its background image, alongside the name of the set and the set's icon. A background color is also applied as a fallback based on the index supplied (will be one of the 5 magic colors)
 *
 * @example
 *  <Set
 *    set={set}
 *  />
 */
export function Set(props: SetProps) {
  const { set } = props;
  const { code, icon_svg_uri, name } = set;

  const isSetNameVeryLong = name?.length > 28;

  const routeForSet = `/sets/${code}`;

  return (
    <Link
      className='relative flex h-[var(--Set--height-mobile)] w-[var(--Set--width-mobile)] cursor-pointer flex-col items-end justify-between rounded bg-neutral-300 text-center shadow-md dark:bg-neutral-400 lg:h-[var(--Set--height-desktop)] lg:w-[var(--Set--width-desktop)]'
      href={routeForSet}
      key={code}
    >
      <picture className='absolute'>
        <source
          media='(max-width: 1023px)'
          srcSet={`/sets/${code}/preview/480.webp`}
        />
        <source
          media='(min-width: 1024px)'
          srcSet={`/sets/${code}/preview/576.webp`}
        />
        <img
          alt={`${name}: Preview Card Art`}
          className='h-[var(--Set--height-mobile)] max-h-[var(--Set--height-mobile)] w-[var(--Set--width-mobile)] max-w-[var(--Set--width-mobile)] rounded lg:h-[var(--Set--height-desktop)] lg:max-h-[var(--Set--height-desktop)] lg:w-[var(--Set--width-desktop)] lg:max-w-[var(--Set--width-desktop)]'
          src={`/sets/${code}/preview/576.webp`}
        />
      </picture>

      <div className='relative mr-4 mt-4 flex h-14 w-14 flex-col items-center justify-center rounded'>
        <img
          alt={`${name}: Set Icon`}
          className='max-w-14 max-h-14'
          height={56}
          width={56}
          src={icon_svg_uri}
          style={{
            filter: convertSVGToWhite,
          }}
        />
      </div>

      <h3
        className={`z-10 mb-0 mt-auto h-1/4 w-full rounded-b bg-black bg-opacity-50 p-2 leading-loose ${
          isSetNameVeryLong ? 'text-base' : 'text-lg'
        } font-medium text-slate-100`}
        style={isSetNameVeryLong ? { paddingTop: '11px' } : {}}
      >
        {name}
      </h3>
    </Link>
  );
}
