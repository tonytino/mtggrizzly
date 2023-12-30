'use client';

import * as React from 'react';
import { CardType } from '@/types/card';

const PERMITTED_COLORS = {
  W: 'W',
  U: 'U',
  B: 'B',
  R: 'R',
  G: 'G',
  Colorless: 'Colorless',
} as const;

type PermittedColors = keyof typeof PERMITTED_COLORS;

type CardsQueryContextType = {
  /**
   * The function to clear the query options, resetting them to their default state
   */
  clearQueries: () => void;
  /**
   * The card types permitted to be in a type line of a card, e.g. ["Instant", "Sorcery"]
   * @example ["Instant", "Sorcery"]
   */
  permittedCardTypes: CardType[];
  /**
   * The colors (including colorless) permitted to be in the cost of a card. If the permitted colors includes white and blue, all cards with exclusively white or blue in their cost, or both, will be matched. Example: ["W","U"]
   * @example ["W","U"]
   */
  permittedColors: PermittedColors[];
  /**
   * The text to search for within each card's name, type, and oracle text. This will search for the full text as is rather than trying to find the presence of the individual words anywhere in the three mentioned fields. For example, if you search for "enters battlefield", it will not match cards with "enters the battlefield" in their oracle text. Eventually, we'll add this functionality, but for now, we'll keep it simple. Example: "enters"
   * @example "enters"
   */
  searchText: string;
  /**
   * The function to invoke to update the query options
   */
  setQueries: (_: unknown) => void;
};

const CardsQueryContext = React.createContext<CardsQueryContextType>(null);

export default CardsQueryContext;
