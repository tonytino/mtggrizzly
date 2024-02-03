import { React, render, screen, userEvent } from 'test-utils';
import { CardsQueryProviderMock } from '@/src/app/sets/[set]/CardsQueryProvider';
import {
  RarityFilter,
  rarities,
  rarityLabel as rarityInputLabel,
} from './RarityFilter';

const rarityLabels = Object.keys(rarities);
const rarityLabel = rarityLabels[0];
const rarityValue = rarities[rarityLabel];
const setPermittedRarities = jest.fn();

describe('<RarityFilter />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('features', () => {
    test('renders a label and a toggle group', () => {
      render(
        <CardsQueryProviderMock
          contextValues={{
            setPermittedRarities,
          }}
        >
          <RarityFilter />
        </CardsQueryProviderMock>
      );

      expect(screen.getByText(rarityInputLabel)).toBeInTheDocument();

      rarityLabels.map((rarityLabel) => {
        expect(
          screen.getByRole('button', { name: rarityLabel })
        ).toBeInTheDocument();
      });
    });

    describe('when a rarity', () => {
      describe('is selected', () => {
        test('it is visually indicated', () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                permittedRarities: [rarityValue],
                setPermittedRarities,
              }}
            >
              <RarityFilter />
            </CardsQueryProviderMock>
          );

          const rarityToggle = screen.getByRole('button', {
            name: rarityLabel,
          });

          expect(rarityToggle).toHaveClass('bg-sky-800 text-slate-100');
          expect(rarityToggle).not.toHaveClass('bg-slate-200');
        });
      });

      describe('is NOT selected', () => {
        test('it is visually indicated', () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                permittedRarities: [],
                setPermittedRarities,
              }}
            >
              <RarityFilter />
            </CardsQueryProviderMock>
          );

          const rarityToggle = screen.getByRole('button', {
            name: rarityLabel,
          });

          expect(rarityToggle).toHaveClass('bg-slate-200');
          expect(rarityToggle).not.toHaveClass('bg-sky-800 text-slate-100');
        });
      });
    });

    describe('when the user clicks a rarity', () => {
      test('setPermittedRarities of CardsQueryContext is invoked', async () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              setPermittedRarities,
            }}
          >
            <RarityFilter />
          </CardsQueryProviderMock>
        );

        expect(setPermittedRarities).not.toHaveBeenCalled();

        await userEvent.click(screen.getByText(rarityLabel));

        expect(setPermittedRarities).toHaveBeenCalledWith([rarityValue]);
      });
    });
  });
});
