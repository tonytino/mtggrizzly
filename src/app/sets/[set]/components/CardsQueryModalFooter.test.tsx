// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
import { React, render, screen, userEvent } from 'test-utils';
import {
  CardsQueryModalFooter,
  closeButtonText,
  resetButtonText,
} from './CardsQueryModalFooter';

const onCloseFn = jest.fn();
const onResetFn = jest.fn();
const windowConfirm = window.confirm;

describe('<CardsQueryModalFooter />', () => {
  afterEach(() => {
    jest.resetAllMocks();
    window.confirm = windowConfirm;
  });

  describe('features', () => {
    test('the close button is rendered', () => {
      render(
        <Dialog.Root>
          <CardsQueryModalFooter
            onClose={onCloseFn}
            onReset={onResetFn}
          />
        </Dialog.Root>
      );

      expect(
        screen.getByRole('button', { name: closeButtonText })
      ).toBeInTheDocument();
    });

    test('the reset button is rendered', () => {
      render(
        <Dialog.Root>
          <CardsQueryModalFooter
            onClose={onCloseFn}
            onReset={onResetFn}
          />
        </Dialog.Root>
      );

      expect(
        screen.getByRole('button', { name: resetButtonText })
      ).toBeInTheDocument();
    });

    test('prop:onReset is invoked when the reset button is clicked and confirmed', async () => {
      const windowConfirmMock = jest.fn(() => true);
      window.confirm = windowConfirmMock;

      render(
        <Dialog.Root>
          <CardsQueryModalFooter
            onClose={onCloseFn}
            onReset={onResetFn}
          />
        </Dialog.Root>
      );

      expect(windowConfirmMock).not.toHaveBeenCalled();
      expect(onResetFn).not.toHaveBeenCalled();

      await userEvent.click(
        screen.getByRole('button', { name: resetButtonText })
      );

      expect(windowConfirmMock).toHaveBeenCalled();
      expect(onResetFn).toHaveBeenCalled();
    });

    test('prop:onReset is NOT invoked when the reset button is clicked and cancelled', async () => {
      const windowConfirmMock = jest.fn(() => false);
      window.confirm = windowConfirmMock;

      render(
        <Dialog.Root>
          <CardsQueryModalFooter
            onClose={onCloseFn}
            onReset={onResetFn}
          />
        </Dialog.Root>
      );

      expect(windowConfirmMock).not.toHaveBeenCalled();
      expect(onResetFn).not.toHaveBeenCalled();

      await userEvent.click(
        screen.getByRole('button', { name: resetButtonText })
      );

      expect(windowConfirmMock).toHaveBeenCalled();
      expect(onResetFn).not.toHaveBeenCalled();
    });

    test('prop:onClose is invoked when the close button is clicked', async () => {
      render(
        <Dialog.Root>
          <CardsQueryModalFooter
            onClose={onCloseFn}
            onReset={onResetFn}
          />
        </Dialog.Root>
      );

      expect(onCloseFn).not.toHaveBeenCalled();

      await userEvent.click(
        screen.getByRole('button', { name: closeButtonText })
      );

      expect(onCloseFn).toHaveBeenCalled();
    });
  });
});
