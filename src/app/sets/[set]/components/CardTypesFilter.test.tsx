import { React, render, screen, userEvent } from 'test-utils';
import { CardsQueryProviderMock } from '@/src/app/sets/[set]/CardsQueryProvider';
import { cardTypes, cardTypesLabel, CardTypesFilter } from './CardTypesFilter';
import { CardType } from '@/types/card';

const cardType = cardTypes[0] as CardType;
const setQueries = jest.fn();

describe('<CardTypesFilter />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('features', () => {
    test('renders a label and a toggle group', () => {
      render(
        <CardsQueryProviderMock
          contextValues={{
            setQueries,
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
                setQueries,
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
                setQueries,
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
      test('setQueries of CardsQueryContext is invoked', async () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              setQueries,
            }}
          >
            <CardTypesFilter />
          </CardsQueryProviderMock>
        );

        expect(setQueries).not.toHaveBeenCalled();

        await userEvent.click(screen.getByText(cardType));

        expect(setQueries).toHaveBeenCalled();
      });
    });

    describe('when the user keypresses a card type', () => {
      test('setQueries of CardsQueryContext is invoked', async () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              setQueries,
            }}
          >
            <CardTypesFilter />
          </CardsQueryProviderMock>
        );

        expect(setQueries).not.toHaveBeenCalled();

        await userEvent.type(screen.getByText(cardType), ' ');

        expect(setQueries).toHaveBeenCalled();
      });
    });
  });
});
