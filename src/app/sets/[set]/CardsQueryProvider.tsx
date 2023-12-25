'use client';

import * as React from 'react';
import CardsQueryContext from './CardsQueryContext';

/**
 * This component exposes the CardsQueryContext to its children and manages the
 * state of the context
 */
function CardsQueryProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [queries, setQueries] = React.useState({
    permittedCardTypes: [],
    permittedColors: [],
    searchText: '',
  });

  return (
    <CardsQueryContext.Provider value={{ ...queries, setQueries }}>
      {children}
    </CardsQueryContext.Provider>
  );
}

export default CardsQueryProvider;
