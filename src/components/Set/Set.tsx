import * as React from 'react';
import Link from 'next/link';
import { Pencil1Icon } from '@radix-ui/react-icons';
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
  const { code, icon_svg_uri, name, preview_card } = set;
  const { artist } = preview_card;

  const isSetNameVeryLong = name?.length > 28;

  const routeForSet = `/sets/${code}`;

  return (
    <Link
      className='relative flex h-[var(--Set--height-mobile)] w-[var(--Set--width-mobile)] cursor-pointer flex-col items-end justify-between overflow-hidden rounded bg-neutral-300 text-center shadow-md dark:bg-neutral-400 lg:h-[var(--Set--height-desktop)] lg:w-[var(--Set--width-desktop)]'
      href={routeForSet}
      key={code}
    >
      <picture>
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
          className='w-[var(--Set--width-mobile)]	max-w-[var(--Set--width-mobile)] scale-105 rounded lg:w-[var(--Set--width-desktop)] lg:max-w-[var(--Set--width-desktop)]'
          src={`/sets/${code}/preview/576.webp`}
        />
      </picture>

      <div className='absolute right-0 top-0 mr-4 mt-4 flex h-14 w-14 flex-col items-center justify-center rounded'>
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
        className={`absolute bottom-0 z-10 mb-0 mt-auto h-1/4 w-full rounded-b bg-black bg-opacity-50 p-2 leading-loose ${
          isSetNameVeryLong ? 'text-base' : 'text-lg'
        } font-medium text-slate-100`}
        style={isSetNameVeryLong ? { paddingTop: '11px' } : {}}
      >
        {name}
      </h3>

      <div className='absolute bottom-0 left-0 right-0 flex justify-between  px-2 py-[4px] text-[8px] text-slate-100'>
        <p className='flex items-center'>
          <Pencil1Icon
            height='8px'
            width='8px'
          />
          &nbsp;{artist}
        </p>

        <p>™ & © Wizards of the Coast</p>
      </div>
    </Link>
  );
}
