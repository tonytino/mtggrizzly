import { React, render, screen, userEvent } from 'test-utils';
import { CardsQueryProviderMock } from '@/src/app/sets/[set]/CardsQueryProvider';
import {
  clearButtonText,
  SearchFilter,
  placeholderText,
  searchLabel,
} from './SearchFilter';

const setSearchText = jest.fn();

describe('<SearchFilter />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('features', () => {
    test('renders an input with a label and placeholder text', () => {
      render(
        <CardsQueryProviderMock
          contextValues={{
            setSearchText,
          }}
        >
          <SearchFilter />
        </CardsQueryProviderMock>
      );

      expect(screen.getByLabelText(searchLabel)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });

    describe('when the user types', () => {
      test('setSearchText of CardsQueryContext is invoked', async () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              setSearchText,
            }}
          >
            <SearchFilter />
          </CardsQueryProviderMock>
        );

        expect(setSearchText).not.toHaveBeenCalled();

        await userEvent.type(screen.getByLabelText(searchLabel), 'S');

        expect(setSearchText).toHaveBeenCalledWith('S');
      });
    });

    describe('when searchText exists within CardsQueryContext', () => {
      describe('when the user clicks the input clear button', () => {
        test('setSearchText of CardsQueryContext is invoked and the search bar is focused', async () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                searchText: 'Storm',
                setSearchText,
              }}
            >
              <SearchFilter />
            </CardsQueryProviderMock>
          );

          const clearButton = screen.getByRole('button', {
            name: clearButtonText,
          });

          expect(setSearchText).not.toHaveBeenCalled();
          expect(clearButton).toBeInTheDocument();

          await userEvent.click(clearButton);

          expect(setSearchText).toHaveBeenCalledWith('');
          expect(screen.getByLabelText(searchLabel)).toHaveFocus();
        });
      });
    });

    describe('when searchText does NOT exist within CardsQueryContext', () => {
      test('the input clear button is not rendered', async () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              searchText: '',
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
