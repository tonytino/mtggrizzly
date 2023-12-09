import { React, render, screen } from 'test-utils';
import type { Set as SetType } from '@/types';
import { Set } from './Set';
import SampleSet from './Set.sample.json';

const set = SampleSet as SetType;

describe('<Set />', () => {
  describe('features', () => {
    test('renders the set name with a larger font when it is not long', () => {
      render(<Set set={set} />);

      const setName = screen.getByText(set.name);

      expect(setName).toBeInTheDocument();
      expect(setName).toHaveClass('text-lg');
      expect(setName).not.toHaveStyle({ paddingTop: '11px' });
    });

    test('renders the set name with a smaller font when it is long', () => {
      const name = 'Adventures in the Forgotten Realms';

      render(<Set set={{ ...set, name }} />);

      const setName = screen.getByText(name);

      expect(setName).toBeInTheDocument();
      expect(setName).toHaveClass('text-base');
      expect(setName).toHaveStyle({ paddingTop: '11px' });
    });

    test('renders a link to the set page', async () => {
      render(<Set set={set} />);

      const setPageLink = screen.getByRole('link');

      expect(setPageLink).toBeInTheDocument();
      expect(setPageLink).toHaveAttribute('href', `/sets/${set.code}`);
    });

    test('renders the set preview card art', () => {
      render(<Set set={set} />);

      const setPreviewImage = screen.getByAltText(
        `${set.name}: Preview Card Art`
      );

      expect(setPreviewImage).toBeInTheDocument();
      expect(setPreviewImage).toHaveAttribute(
        'src',
        `/sets/${set.code}/preview/576.webp`
      );
    });

    test('renders the set icon', () => {
      render(<Set set={set} />);

      const setIcon = screen.getByAltText(`${set.name}: Set Icon`);

      expect(setIcon).toBeInTheDocument();
      expect(setIcon).toHaveAttribute('src', set.icon_svg_uri);
    });

    test('renders the name of the artist for the preview art card', () => {
      render(<Set set={set} />);

      expect(screen.getByText(set.preview_card.artist)).toBeInTheDocument();
    });

    test('renders the WOTC trademark and copyright', () => {
      render(<Set set={set} />);

      expect(
        screen.getByText('™ & © Wizards of the Coast')
      ).toBeInTheDocument();
    });

    test('renders the pencil icon', () => {
      render(<Set set={set} />);

      expect(screen.getByTestId('pencil-icon')).toBeInTheDocument();
    });
  });
});
