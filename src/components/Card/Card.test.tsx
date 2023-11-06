import { React, render, screen } from 'test-utils';
import { Card } from './Card';

describe('<Card />', () => {
  test('test', () => {
    render(<Card />);

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
