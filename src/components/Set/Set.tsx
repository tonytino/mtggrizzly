'use client';
import * as React from 'react';

type SetProps = {
  /**
   * Placeholder
   */
  children?: React.ReactNode;
};

/**
 * Placeholder
 *
 * @example
 * <Set />
 */
export function Set(props: SetProps) {
  const { children } = props;

  return <div data-testid='test'>{children}</div>;
}
