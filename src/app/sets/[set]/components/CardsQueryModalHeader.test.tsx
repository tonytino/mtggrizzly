// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
import { React, render, screen, userEvent } from 'test-utils';
import { CardsQueryProviderMock } from '@/src/app/sets/[set]/CardsQueryProvider';
import {
  CardsQueryModalHeader,
  modalDescription,
  modalTitle,
} from './CardsQueryModalHeader';

const closeModalLabel = 'closeModalLabel';
const closeModal = jest.fn();

describe('<CardsQueryModalHeader />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('features', () => {
    test('the modal title is rendered', () => {
      render(
        <CardsQueryProviderMock
          contextValues={{
            closeModal,
          }}
        >
          <Dialog.Root>
            <CardsQueryModalHeader closeModalLabel={closeModalLabel} />
          </Dialog.Root>
        </CardsQueryProviderMock>
      );

      expect(screen.getByText(modalTitle)).toBeInTheDocument();
    });

    test('the modal description is rendered', () => {
      render(
        <CardsQueryProviderMock
          contextValues={{
            closeModal,
          }}
        >
          <Dialog.Root>
            <CardsQueryModalHeader closeModalLabel={closeModalLabel} />
          </Dialog.Root>
        </CardsQueryProviderMock>
      );

      expect(screen.getByText(modalDescription)).toBeInTheDocument();
    });

    describe('prop:closeModalLabel', () => {
      test('is used for the (icon) button', () => {
        render(
          <CardsQueryProviderMock
            contextValues={{
              closeModal,
            }}
          >
            <Dialog.Root>
              <CardsQueryModalHeader closeModalLabel={closeModalLabel} />
            </Dialog.Root>
          </CardsQueryProviderMock>
        );

        expect(screen.getByLabelText(closeModalLabel)).toBeInTheDocument();
      });
    });

    describe('when the (icon) button', () => {
      describe('is clicked', () => {
        test('the modal is closed', async () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                closeModal,
              }}
            >
              <Dialog.Root>
                <CardsQueryModalHeader closeModalLabel={closeModalLabel} />
              </Dialog.Root>
            </CardsQueryProviderMock>
          );

          expect(closeModal).not.toHaveBeenCalled();

          await userEvent.click(screen.getByLabelText(closeModalLabel));

          expect(closeModal).toHaveBeenCalled();
        });
      });

      describe('is keypressed', () => {
        test('the modal is closed', async () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                closeModal,
              }}
            >
              <Dialog.Root>
                <CardsQueryModalHeader closeModalLabel={closeModalLabel} />
              </Dialog.Root>
            </CardsQueryProviderMock>
          );

          expect(closeModal).not.toHaveBeenCalled();

          await userEvent.type(screen.getByLabelText(closeModalLabel), ' ');

          expect(closeModal).toHaveBeenCalled();
        });
      });
    });
  });
});
