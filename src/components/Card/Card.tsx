// Disabled this rule as we'd easily blow through the image optimiziation budget
// https://vercel.com/docs/limits/usage#image-optimization
/* eslint-disable @next/next/no-img-element */

'use client';
import * as React from 'react';
// https://github.com/radix-ui/icons/blob/master/packages/radix-icons/src/SymbolIcon.tsx
import { SymbolIcon } from '@radix-ui/react-icons';
import type { Card } from '@/types';

const noop = () => {};

const FALLBACK_IMAGE_SRC = '/grizzly-bears.png';

/**
 * Cards with these layouts have two card images we need to render individually
 * https://scryfall.com/docs/api/layouts
 */
const MULTI_FACE_CARD_LAYOUTS = [
  'battle',
  'double_faced_token',
  'meld',
  'reversible_card',
  'transform',
];

const defaultState = {
  error: false,
  faceName: 'Grizzly Bears',
  imgSrc: FALLBACK_IMAGE_SRC,
  isFrontFace: true,
  isMultiFaceCard: false,
};

function stateReducer(state, action) {
  if (action.type === 'error') {
    return {
      ...state,
      error: true,
      imgSrc: FALLBACK_IMAGE_SRC,
      faceName: 'Something went wrong, sorry!',
    };
  }

  if (action.type === 'swap_face') {
    const { faceName, imgSrc } = action;
    return {
      ...state,
      isFrontFace: !state.isFrontFace,
      faceName,
      imgSrc,
    };
  }

  throw Error('Unknown action.');
}

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
  const { card_faces = [], image_uris, layout, name: fullName } = card;
  const isMultiFaceCard = MULTI_FACE_CARD_LAYOUTS.includes(layout);
  const initialCardImageSrc = isMultiFaceCard
    ? card_faces[0]?.image_uris?.png
    : image_uris?.png;
  const initialFaceName = isMultiFaceCard ? card_faces[0]?.name : fullName;

  const [state, dispatch] = React.useReducer(stateReducer, {
    ...defaultState,
    faceName: initialFaceName,
    imgSrc: initialCardImageSrc,
    isMultiFaceCard,
  });

  const { faceName, imgSrc, isFrontFace } = state;

  const ElementType = isMultiFaceCard ? 'button' : 'div';

  const handleSwapCardFace = () => {
    try {
      dispatch({
        type: 'swap_face',
        faceName: card_faces[isFrontFace ? 1 : 0].name,
        imgSrc: card_faces[isFrontFace ? 1 : 0].image_uris.png,
      });
    } catch (error) {
      dispatch({
        type: 'error',
      });
    }
  };

  const handleImageSrcError = (error) => {
    error.stopPropagation();

    dispatch({
      type: 'error',
    });
  };

  return (
    <div
      className='flex flex-col items-center justify-between text-center'
      key={fullName}
    >
      <ElementType
        className={`group relative mx-auto my-2 rounded-lg border-4 border-transparent ${
          isMultiFaceCard
            ? 'cursor-pointer hover:border-lime-600'
            : 'cursor-default'
        }`}
        onClick={isMultiFaceCard ? handleSwapCardFace : noop}
      >
        <img
          alt={faceName}
          className='rounded-lg shadow-lg'
          height={680}
          loading={isPriority ? 'eager' : 'lazy'}
          onError={handleImageSrcError}
          src={imgSrc}
          width={488}
          // priority={isPriority}
        />

        {isMultiFaceCard && (
          // Load the back face so that the image loads immediately when a card
          // face is swapped. Note that we cannot lazy load as the browser will
          // not load it until it's close to the viewport
          // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#lazy
          // In effect, the image won't be loaded at all until the swap occurs
          <img
            alt={card_faces[1].name}
            className='hidden'
            src={card_faces[1].image_uris.png}
          />
        )}

        {isMultiFaceCard && (
          <div
            aria-label='Transform card'
            className='absolute right-8 top-56 flex h-16 w-16 items-center justify-center rounded-full bg-black bg-opacity-40'
          >
            <SymbolIcon
              color='white'
              height='40px'
              width='40px'
            />
          </div>
        )}
      </ElementType>

      <p className='my-auto text-lg font-medium text-slate-800 dark:text-slate-50'>
        {faceName}
        {isMultiFaceCard && isFrontFace && ' (Front)'}
        {isMultiFaceCard && !isFrontFace && ' (Back)'}
      </p>
    </div>
  );
}
