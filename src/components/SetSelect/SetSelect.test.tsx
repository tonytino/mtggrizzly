import { React, render, screen } from 'test-utils';
import { SetSelect } from './SetSelect';

describe('<SetSelect />', () => {
  test('test', () => {
    render(<SetSelect sets={[]} />);

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
