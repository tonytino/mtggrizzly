import { React, render, screen, userEvent } from 'test-utils';
import { CardsQueryProviderMock } from '@/src/app/sets/[set]/CardsQueryProvider';
import { ColorsFilter, colors, colorsLabel } from './ColorsFilter';

const colorLabels = Object.keys(colors);
const colorLabel = colorLabels[0];
const colorValue = colors[colorLabel];
const setPermittedColors = jest.fn();

describe('<ColorsFilter />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('features', () => {
    test('renders a label and a toggle group', () => {
      render(
        <CardsQueryProviderMock
          contextValues={{
            setPermittedColors,
          }}
        >
          <ColorsFilter />
        </CardsQueryProviderMock>
      );

      expect(screen.getByText(colorsLabel)).toBeInTheDocument();

      colorLabels.map((colorLabel) => {
        expect(
          screen.getByRole('button', { name: colorLabel })
        ).toBeInTheDocument();
      });
    });

    describe('when a color', () => {
      describe('is selected', () => {
        test('it is visually indicated', () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                permittedColors: [colorValue],
                setPermittedColors,
              }}
            >
              <ColorsFilter />
            </CardsQueryProviderMock>
          );

          const colorToggle = screen.getByRole('button', { name: colorLabel });

          expect(colorToggle).toHaveClass('bg-sky-800 text-slate-100');
          expect(colorToggle).not.toHaveClass('bg-slate-200');
        });
      });

      describe('is NOT selected', () => {
        test('it is visually indicated', () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                permittedColors: [],
                setPermittedColors,
              }}
            >
              <ColorsFilter />
            </CardsQueryProviderMock>
          );

          const colorToggle = screen.getByRole('button', { name: colorLabel });

          expect(colorToggle).toHaveClass('bg-slate-200');
          expect(colorToggle).not.toHaveClass('bg-sky-800 text-slate-100');
        });
      });
    });

    describe('when the user clicks a color', () => {
      test('setPermittedColors of CardsQueryContext is invoked', async () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              setPermittedColors,
            }}
          >
            <ColorsFilter />
          </CardsQueryProviderMock>
        );

        expect(setPermittedColors).not.toHaveBeenCalled();

        await userEvent.click(screen.getByText(colorLabel));

        expect(setPermittedColors).toHaveBeenCalledWith([colorValue]);
      });
    });
  });
});
