// Disabled this rule as we'd easily blow through the image optimiziation budget
// https://vercel.com/docs/limits/usage#image-optimization
/* eslint-disable @next/next/no-img-element */

import * as React from 'react';
// import Image from 'next/image';
import './Set.css';
import Link from 'next/link';
import type { Set } from '@/types';
import { CLASSES_FOR_MAGIC_COLORS } from './constants';

const convertSVGToWhite =
  'invert(100%) sepia(0%) saturate(2%) hue-rotate(54deg) brightness(105%) contrast(101%)';

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
 * Renders a Set as a button that uses a random (from the set) card's art as its background image, alongside the name of the set and the set's icon. A background color is also applied as a fallback based on the index supplied (will be one of the 5 magic colors)
 *
 * @example
 *  <Set
 *    index={4}
 *    set={set}
 *  />
 */
export function Set(props: SetProps) {
  const { index, set } = props;
  const { code, icon_svg_uri, name } = set;

  const buttonColors = CLASSES_FOR_MAGIC_COLORS[index % 5];
  const isSetNameVeryLong = name?.length > 28;

  const routeForSet = `/sets/${code}`;

  return (
    <Link
      className={`set-select-card relative z-0 flex cursor-pointer flex-col items-end justify-between rounded border-transparent text-center shadow-md ${buttonColors} bg-cover bg-clip-border bg-center`}
      href={routeForSet}
      key={code}
    >
      <img
        alt={`${name}: Preview Card Art`}
        className='preview-art absolute rounded'
        src={`/sets/${code}/preview/320.webp`}
        srcSet={`/sets/${code}/preview/320.webp 320w, /sets/${code}/preview/384.webp 384w`}
      />

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

      <p
        className={`z-10 mb-0 mt-auto h-1/4 w-full rounded-b bg-black bg-opacity-50 p-2 leading-loose ${
          isSetNameVeryLong ? 'text-base' : 'text-lg'
        } font-medium text-slate-100`}
        style={isSetNameVeryLong ? { paddingTop: '11px' } : {}}
      >
        {name}
      </p>
    </Link>
  );
}
