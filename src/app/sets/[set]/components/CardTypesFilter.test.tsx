import { React, render, screen, userEvent } from 'test-utils';
import { CardType } from '@/types/card';
import { CardsQueryProviderMock } from '@/src/app/sets/[set]/CardsQueryProvider';
import { cardTypes, cardTypesLabel, CardTypesFilter } from './CardTypesFilter';

const cardType = cardTypes[0] as CardType;
const setPermittedCardTypes = jest.fn();

describe('<CardTypesFilter />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('features', () => {
    test('renders a label and a toggle group', () => {
      render(
        <CardsQueryProviderMock
          contextValues={{
            setPermittedCardTypes,
          }}
        >
          <CardTypesFilter />
        </CardsQueryProviderMock>
      );

      expect(screen.getByText(cardTypesLabel)).toBeInTheDocument();

      cardTypes.map((cardType) => {
        expect(
          screen.getByRole('button', { name: cardType })
        ).toBeInTheDocument();
      });
    });

    describe('when a color', () => {
      describe('is selected', () => {
        test('it is visually indicated', () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                permittedCardTypes: [cardType],
                setPermittedCardTypes,
              }}
            >
              <CardTypesFilter />
            </CardsQueryProviderMock>
          );

          const cardTypeToggle = screen.getByRole('button', { name: cardType });

          expect(cardTypeToggle).toHaveClass('bg-sky-800 text-slate-100');
          expect(cardTypeToggle).not.toHaveClass('bg-slate-200');
        });
      });

      describe('is NOT selected', () => {
        test('it is visually indicated', () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                permittedCardTypes: [],
                setPermittedCardTypes,
              }}
            >
              <CardTypesFilter />
            </CardsQueryProviderMock>
          );

          const cardTypeToggle = screen.getByRole('button', {
            name: cardType,
          });

          expect(cardTypeToggle).toHaveClass('bg-slate-200');
          expect(cardTypeToggle).not.toHaveClass('bg-sky-800 text-slate-100');
        });
      });
    });

    describe('when the user clicks a card type', () => {
      test('setPermittedCardTypes of CardsQueryContext is invoked', async () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              setPermittedCardTypes,
            }}
          >
            <CardTypesFilter />
          </CardsQueryProviderMock>
        );

        expect(setPermittedCardTypes).not.toHaveBeenCalled();

        await userEvent.click(screen.getByText(cardType));

        expect(setPermittedCardTypes).toHaveBeenCalledWith([cardType]);
      });
    });
  });
});
