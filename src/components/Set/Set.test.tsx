import { React, render, screen, userEvent } from 'test-utils';
import type { Set as SetType } from '@/types';
import { Set } from './Set';
import SampleSet from './Set.sample.json';
import { CLASSES_FOR_MAGIC_COLORS } from './constants';

const pushMock = jest.fn();

jest.mock('next/navigation', () => {
  return {
    useRouter: () => {
      return {
        push: pushMock,
      };
    },
  };
});

const set = SampleSet as SetType;

describe('<Set />', () => {
  describe('features', () => {
    test('renders the set image alongside the set name', () => {
      render(
        <Set
          index={0}
          set={set}
        />
      );

      const setIcon = screen.getByAltText(`${set.name} Set Icon`);
      const setPreviewImage = screen.getByRole('button');
      const setName = screen.getByText(set.name);

      expect(setIcon).toBeInTheDocument();
      expect(setIcon).toHaveAttribute('src', set.icon_svg_uri);

      expect(setPreviewImage).toBeInTheDocument();
      expect(setPreviewImage).toHaveStyle(
        `background-image: url(${set.preview_art})`
      );

      expect(setName).toBeInTheDocument();
    });

    describe('when clicked', () => {
      test('navigates you to the set page', async () => {
        render(
          <Set
            index={0}
            set={set}
          />
        );

        const setPreviewImage = screen.getByRole('button');

        await userEvent.click(setPreviewImage);

        expect(pushMock).toHaveBeenCalledWith(`/sets/${set.code}`);
      });
    });
  });

  describe('prop: index', () => {
    test('renders with a fallback background color', () => {
      render(
        <Set
          index={0}
          set={set}
        />
      );

      const setPreviewImage = screen.getByRole('button');

      expect(setPreviewImage).toHaveClass(CLASSES_FOR_MAGIC_COLORS[0]);
    });
  });
});
