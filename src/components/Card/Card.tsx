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
  'reversible_card',
  'transform',
];

const defaultState = {
  faceName: 'Grizzly Bears',
  imgSrc: FALLBACK_IMAGE_SRC,
  isFrontFace: true,
};

function stateReducer(state, action) {
  if (action.type === 'swap_face') {
    const { faceName, imgSrc } = action;
    return {
      ...state,
      isFrontFace: !state.isFrontFace,
      faceName,
      imgSrc,
    };
  }
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
 * Renders a Card from a Set with the card image displayed
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
    ? card_faces[0]?.image_uris?.normal
    : image_uris?.normal;
  const initialFaceName = isMultiFaceCard ? card_faces[0]?.name : fullName;

  const [state, dispatch] = React.useReducer(stateReducer, {
    ...defaultState,
    faceName: initialFaceName,
    imgSrc: initialCardImageSrc,
  });

  const { faceName, imgSrc, isFrontFace } = state;

  const ElementType = isMultiFaceCard ? 'button' : 'div';

  const handleSwapCardFace = () => {
    dispatch({
      type: 'swap_face',
      faceName: card_faces[isFrontFace ? 1 : 0].name,
      imgSrc: card_faces[isFrontFace ? 1 : 0].image_uris.normal,
    });
  };

  return (
    <div className='flex h-[453] min-h-[453] w-[325] min-w-[325] flex-col items-center justify-between text-center'>
      <ElementType
        aria-label={
          isMultiFaceCard
            ? `See the ${isFrontFace ? 'back' : 'front'} side of the card`
            : undefined
        }
        className={`group relative mx-auto rounded-lg border-4 border-transparent ${
          isMultiFaceCard
            ? 'cursor-pointer hover:border-sky-600'
            : 'cursor-default'
        }`}
        onClick={isMultiFaceCard ? handleSwapCardFace : noop}
      >
        <img
          alt={faceName}
          className='rounded-[1rem]'
          height={453}
          loading={isPriority ? 'eager' : 'lazy'}
          src={imgSrc}
          width={325}
        />

        {isMultiFaceCard && isFrontFace && (
          // Load the back face so that the image loads immediately when a card
          // face is swapped. Note that we cannot lazy load as the browser will
          // not load it until it's close to the viewport
          // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#lazy
          // In effect, the image won't be loaded at all until the swap occurs
          <img
            alt={card_faces[1].name}
            className='hidden'
            hidden
            src={card_faces[1].image_uris.normal}
          />
        )}

        {isMultiFaceCard && (
          <div
            aria-label='Transform card'
            className='absolute right-8 top-36 flex h-16 w-16 items-center justify-center rounded-full bg-black bg-opacity-40'
          >
            <SymbolIcon
              className='text-slate-100'
              height='40px'
              width='40px'
            />
          </div>
        )}
      </ElementType>

      {/* Perhaps temporarily removing this for now to feel it out */}
      {/* <p className='my-auto text-lg font-medium text-sky-800 dark:text-slate-50'>
        {faceName}
        {isMultiFaceCard && isFrontFace && ' (Front)'}
        {isMultiFaceCard && !isFrontFace && ' (Back)'}
      </p> */}
    </div>
  );
}
