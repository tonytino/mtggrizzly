import { React, render, screen } from 'test-utils';
import { SetSelect } from './SetSelect';

describe('<SetSelect />', () => {
  test('test', () => {
    render(<SetSelect />);

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
