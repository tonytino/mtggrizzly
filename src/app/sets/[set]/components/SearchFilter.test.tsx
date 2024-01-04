import { React, render, screen, userEvent } from 'test-utils';
import { CardsQueryProviderMock } from '@/src/app/sets/[set]/CardsQueryProvider';
import {
  clearButtonText,
  SearchFilter,
  placeholderText,
  searchLabel,
} from './SearchFilter';

const setQueries = jest.fn();

describe('<SearchFilter />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('features', () => {
    test('renders an input with a label and placeholder text', () => {
      render(
        <CardsQueryProviderMock
          contextValues={{
            setQueries,
          }}
        >
          <SearchFilter />
        </CardsQueryProviderMock>
      );

      expect(screen.getByLabelText(searchLabel)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });

    describe('when the user types', () => {
      test('setQueries of CardsQueryContext is invoked', async () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              setQueries,
            }}
          >
            <SearchFilter />
          </CardsQueryProviderMock>
        );

        expect(setQueries).not.toHaveBeenCalled();

        await userEvent.type(screen.getByLabelText(searchLabel), 'Storm');

        expect(setQueries).toHaveBeenCalled();
      });
    });

    describe('when searchText exists within CardsQueryContext', () => {
      describe('when the user clicks the input clear button', () => {
        test('setQueries of CardsQueryContext is invoked', async () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                searchText: 'Storm',
                setQueries,
              }}
            >
              <SearchFilter />
            </CardsQueryProviderMock>
          );

          const clearButton = screen.getByRole('button', {
            name: clearButtonText,
          });

          expect(setQueries).not.toHaveBeenCalled();
          expect(clearButton).toBeInTheDocument();

          await userEvent.click(clearButton);

          expect(setQueries).toHaveBeenCalled();
        });
      });

      describe('when the user keypresses the input clear button', () => {
        test('setQueries of CardsQueryContext is invoked', async () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                searchText: 'Storm',
                setQueries,
              }}
            >
              <SearchFilter />
            </CardsQueryProviderMock>
          );

          const clearButton = screen.getByRole('button', {
            name: clearButtonText,
          });

          expect(setQueries).not.toHaveBeenCalled();
          expect(clearButton).toBeInTheDocument();

          await userEvent.type(clearButton, ' ');

          expect(setQueries).toHaveBeenCalled();
        });
      });
    });

    describe('when searchText does NOT exist within CardsQueryContext', () => {
      test('the input clear button is not rendered', async () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              searchText: '',
              setQueries,
            }}
          >
            <SearchFilter />
          </CardsQueryProviderMock>
        );

        expect(
          screen.queryByRole('button', { name: clearButtonText })
        ).not.toBeInTheDocument();
      });
    });
  });
});
