'use client';

import * as React from 'react';

type CardsQueryContextType = {
  /**
   * The colors (including colorless) permitted to be in the cost of the card. If the permitted colors includes white and blue, all cards with exclusively white or blue in their cost, or both, will be matched.
   * @example ["W","U"]
   */
  permittedColors: string[];
  /**
   * The text to search for within each card's name, type, and oracle text. This will search for the full text as is rather than trying to find the presence of the individual words anywhere in the three mentioned fields. For example, if you search for "enters battlefield", it will not match cards with "enters the battlefield" in their oracle text. Eventually, we'll add this functionality, but for now, we'll keep it simple
   */
  searchText: string;
  /**
   * The function to invoke to update the query options
   */
  setQueries: (_: unknown) => void;
};

const CardsQueryContext = React.createContext<CardsQueryContextType>(null);

export default CardsQueryContext;
