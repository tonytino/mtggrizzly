'use client';

import * as React from 'react';
import CardsQueryContext from './CardsQueryContext';

const DEFAULT_STATE = {
  permittedCardTypes: [],
  permittedColors: [],
  searchText: '',
};

/**
 * This component exposes the CardsQueryContext to its children and manages the
 * state of the context
 */
function CardsQueryProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [queries, setQueries] = React.useState(DEFAULT_STATE);

  const resetQueries = React.useCallback(() => setQueries(DEFAULT_STATE), []);

  return (
    <CardsQueryContext.Provider
      value={{ ...queries, resetQueries, setQueries }}
    >
      {children}
    </CardsQueryContext.Provider>
  );
}

export default CardsQueryProvider;
