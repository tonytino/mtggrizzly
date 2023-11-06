'use client';
import * as React from 'react';

type CardProps = {
  /**
   * Placeholder
   */
  children?: React.ReactNode;
};

/**
 * Placeholder
 *
 * @example
 * <Card />
 */
export function Card(props: CardProps) {
  const { children } = props;

  return <div data-testid='test'>{children}</div>;
}
