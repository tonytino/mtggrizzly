import { React, render, screen } from 'test-utils';
import { Set } from './Set';

describe('<Set />', () => {
  test('test', () => {
    render(<Set />);

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
