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

const PERMITTED_RARITIES = {
  common: 'common',
  uncommon: 'uncommon',
  rare: 'rare',
  mythic: 'mythic',
} as const;

export type PermittedColors = keyof typeof PERMITTED_COLORS;

export type PermittedRarities = keyof typeof PERMITTED_RARITIES;

export type CardsQueryContextType = {
  /**
   * Closes the modal
   */
  closeModal: () => void;
  /**
   * Indicates whether the `<CardsQueryModal />` is currently open
   */
  isModalOpen: boolean;
  /**
   * Opens the modal
   */
  openModal: () => void;
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
   * The card rarities permitted
   * @example 'mythic'
   */
  permittedRarities: PermittedRarities[];
  /**
   * Resets the query options to their default state
   */
  resetQueries: () => void;
  /**
   * The text to search for within each card's name, type, and oracle text. This will search for the full text as is rather than trying to find the presence of the individual words anywhere in the three mentioned fields. For example, if you search for "enters battlefield", it will not match cards with "enters the battlefield" in their oracle text. Eventually, we'll add this functionality, but for now, we'll keep it simple. Example: "enters"
   * @example "enters"
   */
  searchText: string;
  /**
   * Updates the card types query option
   */
  setPermittedCardTypes: (cardTypes: CardType[]) => void;
  /**
   * Updates the colors query option
   */
  setPermittedColors: (colors: PermittedColors[]) => void;
  /**
   * Updates the rarities query option
   */
  setPermittedRarities: (colors: PermittedRarities[]) => void;
  /**
   * Updates the search text query option
   */
  setSearchText: (string) => void;
  /**
   * Updates the query options
   * @example
   * setQueries((queries) => {
        return {
          ...queries,
          searchText,
        };
      }),
   */
  setQueries: (_: unknown) => void;
};

const CardsQueryContext = React.createContext<CardsQueryContextType>(null);

export default CardsQueryContext;
