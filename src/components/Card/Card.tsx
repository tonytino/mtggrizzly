// Disabled this rule as we'd easily blow through the image optimiziation budget
// https://vercel.com/docs/limits/usage#image-optimization
/* eslint-disable @next/next/no-img-element */

'use client';
import * as React from 'react';
import type { Card } from '@/types';

type CardProps = {
  /**
   * The Card object
   */
  card: Card;
  /**
   * Is it important to load the card quickly?
   */
  isPriority?: boolean;
};

/**
 * Renders a Card from a Set with the card image displayed alongside the name
 *
 * @example
 *  <Card
 *    card={card}
 *    isPriority
 *  />
 */
export function Card(props: CardProps) {
  const { card, isPriority } = props;

  const { card_faces = [], image_uris, name } = card;

  const { border_crop } = image_uris ?? { border_crop: '' };

  const isMultiFaceCard = card_faces?.length;
  let cardImageSrc = border_crop;

  if (isMultiFaceCard) {
    cardImageSrc = card_faces[0]?.image_uris?.border_crop ?? border_crop;
  }

  return (
    <div
      className='flex cursor-pointer flex-col items-center justify-between text-center'
      key={name}
    >
      <div className='relative mx-auto my-2 rounded-lg border-4 border-black bg-black shadow-md hover:border-lime-600'>
        <img
          className='rounded-lg border-4 border-black'
          alt={name}
          src={cardImageSrc}
          height={680}
          width={488}
          // priority={isPriority}
          loading={isPriority ? 'eager' : 'lazy'}
        />
      </div>

      <p className='my-auto text-lg font-medium text-slate-800 dark:text-slate-50'>
        {name}
      </p>
    </div>
  );
}
