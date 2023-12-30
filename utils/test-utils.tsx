/**
 * Some helpful resources for testing:
 * - [Queries](https://testing-library.com/docs/queries/about#types-of-queries)
 */

import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Providers from '@/src/app/Providers';

// import { ThemeProvider } from 'my-ui-lib';
// import { TranslationProvider } from 'my-i18n-lib';
// import defaultStrings from 'i18n/en-x-default';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <ThemeProvider theme='light'> */}
      {/* <TranslationProvider messages={defaultStrings}> */}
      <Providers>{children}</Providers>
      {/* </TranslationProvider> */}
      {/* </ThemeProvider> */}
    </>
  );
};

const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { React, renderWithProviders as render, userEvent };
