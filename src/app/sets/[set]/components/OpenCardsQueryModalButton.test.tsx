// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
import { React, render, screen, userEvent } from 'test-utils';
import { CardsQueryProviderMock } from '@/src/app/sets/[set]/CardsQueryProvider';
import {
  OpenCardsQueryModalButton,
  buttonLabel,
} from './OpenCardsQueryModalButton';

const openModal = jest.fn();

describe('<OpenCardsQueryModalButton />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('features', () => {
    test('renders a button with a label', () => {
      render(
        <CardsQueryProviderMock
          contextValues={{
            openModal,
          }}
        >
          <Dialog.Root>
            <OpenCardsQueryModalButton />
          </Dialog.Root>
        </CardsQueryProviderMock>
      );

      expect(screen.getByLabelText(buttonLabel)).toBeInTheDocument();
    });

    describe('when clicked', () => {
      test('the modal is opened', async () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              openModal,
            }}
          >
            <Dialog.Root>
              <OpenCardsQueryModalButton />
            </Dialog.Root>
          </CardsQueryProviderMock>
        );

        expect(openModal).not.toHaveBeenCalled();

        await userEvent.click(screen.getByLabelText(buttonLabel));

        expect(openModal).toHaveBeenCalled();
      });
    });

    describe('when keypressed', () => {
      test('the modal is opened', async () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              openModal,
            }}
          >
            <Dialog.Root>
              <OpenCardsQueryModalButton />
            </Dialog.Root>
          </CardsQueryProviderMock>
        );

        expect(openModal).not.toHaveBeenCalled();

        await userEvent.type(screen.getByLabelText(buttonLabel), ' ');

        expect(openModal).toHaveBeenCalled();
      });
    });
  });
});
