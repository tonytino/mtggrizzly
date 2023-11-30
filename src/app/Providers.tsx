'use client';

import * as React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

type ProvidersProps = {
  children: React.ReactNode;
};

/**
 * Renders all providers necessary at the root level
 */
export default function Providers(props: ProvidersProps) {
  return (
    <React.Fragment>
      <Tooltip.Provider>{props.children}</Tooltip.Provider>
    </React.Fragment>
  );
}
