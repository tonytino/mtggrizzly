/**
 * Some helpful resources for testing:
 * - [Queries](https://testing-library.com/docs/queries/about#types-of-queries)
 */

import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';
/**
 * https://testing-library.com/docs/user-event/intro
 */
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Providers from '@/src/app/Providers';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>;
};

const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { React, renderWithProviders as render, userEvent };
