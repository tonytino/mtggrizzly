// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
import { React, render, screen, userEvent } from 'test-utils';
import { CardsQueryProviderMock } from '@/src/app/sets/[set]/CardsQueryProvider';
import {
  CardsQueryModalFooter,
  closeButtonText,
  resetButtonText,
} from './CardsQueryModalFooter';

const closeModal = jest.fn();
const resetQueries = jest.fn();
const windowConfirm = window.confirm;

describe('<CardsQueryModalFooter />', () => {
  afterEach(() => {
    jest.resetAllMocks();
    window.confirm = windowConfirm;
  });

  describe('features', () => {
    test('the close button is rendered', () => {
      render(
        <CardsQueryProviderMock
          contextValues={{
            closeModal,
            resetQueries,
          }}
        >
          <Dialog.Root>
            <CardsQueryModalFooter />
          </Dialog.Root>
        </CardsQueryProviderMock>
      );

      expect(
        screen.getByRole('button', { name: closeButtonText })
      ).toBeInTheDocument();
    });

    test('the reset button is rendered', () => {
      render(
        <CardsQueryProviderMock
          contextValues={{
            closeModal,
            resetQueries,
          }}
        >
          <Dialog.Root>
            <CardsQueryModalFooter />
          </Dialog.Root>
        </CardsQueryProviderMock>
      );

      expect(
        screen.getByRole('button', { name: resetButtonText })
      ).toBeInTheDocument();
    });

    describe('when the close button', () => {
      describe('is clicked', () => {
        test('the modal is closed', async () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                closeModal,
                resetQueries,
              }}
            >
              <Dialog.Root>
                <CardsQueryModalFooter />
              </Dialog.Root>
            </CardsQueryProviderMock>
          );

          expect(closeModal).not.toHaveBeenCalled();

          await userEvent.click(
            screen.getByRole('button', { name: closeButtonText })
          );

          expect(closeModal).toHaveBeenCalled();
        });
      });

      describe('is keypressed', () => {
        test('the modal is closed', async () => {
          render(
            <CardsQueryProviderMock
              contextValues={{
                closeModal,
                resetQueries,
              }}
            >
              <Dialog.Root>
                <CardsQueryModalFooter />
              </Dialog.Root>
            </CardsQueryProviderMock>
          );

          expect(closeModal).not.toHaveBeenCalled();

          await userEvent.type(
            screen.getByRole('button', { name: closeButtonText }),
            ' '
          );

          expect(closeModal).toHaveBeenCalled();
        });
      });
    });

    describe('when the reset button', () => {
      describe('is clicked', () => {
        describe('and the action is confirmed', () => {
          test('the queries are reset', async () => {
            const windowConfirmMock = jest.fn(() => true);
            window.confirm = windowConfirmMock;

            render(
              <CardsQueryProviderMock
                contextValues={{
                  closeModal,
                  resetQueries,
                }}
              >
                <Dialog.Root>
                  <CardsQueryModalFooter />
                </Dialog.Root>
              </CardsQueryProviderMock>
            );

            expect(windowConfirmMock).not.toHaveBeenCalled();
            expect(resetQueries).not.toHaveBeenCalled();

            await userEvent.click(
              screen.getByRole('button', { name: resetButtonText })
            );

            expect(windowConfirmMock).toHaveBeenCalled();
            expect(resetQueries).toHaveBeenCalled();
          });
        });

        describe('and the action is cancelled', () => {
          test('the queries are NOT reset', async () => {
            const windowConfirmMock = jest.fn(() => false);
            window.confirm = windowConfirmMock;

            render(
              <CardsQueryProviderMock
                contextValues={{
                  closeModal,
                  resetQueries,
                }}
              >
                <Dialog.Root>
                  <CardsQueryModalFooter />
                </Dialog.Root>
              </CardsQueryProviderMock>
            );

            expect(windowConfirmMock).not.toHaveBeenCalled();
            expect(resetQueries).not.toHaveBeenCalled();

            await userEvent.click(
              screen.getByRole('button', { name: resetButtonText })
            );

            expect(windowConfirmMock).toHaveBeenCalled();
            expect(resetQueries).not.toHaveBeenCalled();
          });
        });
      });

      describe('is keypressed', () => {
        describe('and the action is confirmed', () => {
          test('the queries are reset', async () => {
            const windowConfirmMock = jest.fn(() => true);
            window.confirm = windowConfirmMock;

            render(
              <CardsQueryProviderMock
                contextValues={{
                  closeModal,
                  resetQueries,
                }}
              >
                <Dialog.Root>
                  <CardsQueryModalFooter />
                </Dialog.Root>
              </CardsQueryProviderMock>
            );

            expect(windowConfirmMock).not.toHaveBeenCalled();
            expect(resetQueries).not.toHaveBeenCalled();

            await userEvent.type(
              screen.getByRole('button', { name: resetButtonText }),
              ' '
            );

            expect(windowConfirmMock).toHaveBeenCalled();
            expect(resetQueries).toHaveBeenCalled();
          });
        });
      });
    });
  });
});
