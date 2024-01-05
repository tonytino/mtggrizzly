'use client';

import * as React from 'react';
import { noop } from '@/root/utils';
import CardsQueryContext, { CardsQueryContextType } from './CardsQueryContext';

const DEFAULT_STATE = {
  permittedCardTypes: [],
  permittedColors: [],
  searchText: '',
};

type CardsQueryProviderType = {
  /**
   * The content rendered with access to the context
   */
  children: React.ReactNode;
};

/**
 * This component exposes the `CardsQueryContext` to its children and manages the state of the context
 */
function CardsQueryProvider(props: CardsQueryProviderType) {
  const { children } = props;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [queries, setQueries] = React.useState(DEFAULT_STATE);

  const closeModal = React.useCallback(() => setIsModalOpen(false), []);
  const openModal = React.useCallback(() => setIsModalOpen(true), []);
  const resetQueries = React.useCallback(() => setQueries(DEFAULT_STATE), []);
  const setPermittedCardTypes = React.useCallback(
    (permittedCardTypes) =>
      setQueries((queries) => {
        return {
          ...queries,
          permittedCardTypes,
        };
      }),
    []
  );
  const setPermittedColors = React.useCallback(
    (permittedColors) =>
      setQueries((queries) => {
        return {
          ...queries,
          permittedColors,
        };
      }),
    []
  );
  const setSearchText = React.useCallback(
    (searchText) =>
      setQueries((queries) => {
        return {
          ...queries,
          searchText,
        };
      }),
    []
  );

  return (
    <CardsQueryContext.Provider
      value={{
        ...queries,
        closeModal,
        isModalOpen,
        openModal,
        resetQueries,
        setPermittedCardTypes,
        setPermittedColors,
        setQueries,
        setSearchText,
      }}
    >
      {children}
    </CardsQueryContext.Provider>
  );
}

type CardsQueryProviderMockType = CardsQueryProviderType & {
  /**
   * The values to apply to the context
   */
  contextValues?: Partial<CardsQueryContextType>;
};

/**
 * This is a mock version of `<CardsQueryProvider />` that supports dependency injection for testing purposes
 */
export function CardsQueryProviderMock(props: CardsQueryProviderMockType) {
  const { children, contextValues } = props;

  const {
    closeModal = noop,
    isModalOpen = false,
    openModal = noop,
    permittedCardTypes = DEFAULT_STATE.permittedCardTypes,
    permittedColors = DEFAULT_STATE.permittedColors,
    resetQueries = noop,
    searchText = DEFAULT_STATE.searchText,
    setPermittedCardTypes = noop,
    setPermittedColors = noop,
    setSearchText = noop,
    setQueries = noop,
  } = contextValues ?? {};

  return (
    <CardsQueryContext.Provider
      value={{
        closeModal,
        isModalOpen,
        openModal,
        permittedCardTypes,
        permittedColors,
        resetQueries,
        searchText,
        setPermittedCardTypes,
        setPermittedColors,
        setQueries,
        setSearchText,
      }}
    >
      {children}
    </CardsQueryContext.Provider>
  );
}

export default CardsQueryProvider;
