// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
import { React, render, screen, userEvent } from 'test-utils';
import {
  CardsQueryModalHeader,
  modalDescription,
  modalTitle,
} from './CardsQueryModalHeader';

const closeModalLabel = 'closeModalLabel';
const onCloseFn = jest.fn();

describe('<CardsQueryModalHeader />', () => {
  describe('features', () => {
    test('the modal title is rendered', () => {
      render(
        <Dialog.Root>
          <CardsQueryModalHeader
            closeModalLabel={closeModalLabel}
            onClose={onCloseFn}
          />
        </Dialog.Root>
      );

      expect(screen.getByText(modalTitle)).toBeInTheDocument();
    });

    test('the modal description is rendered', () => {
      render(
        <Dialog.Root>
          <CardsQueryModalHeader
            closeModalLabel={closeModalLabel}
            onClose={onCloseFn}
          />
        </Dialog.Root>
      );

      expect(screen.getByText(modalDescription)).toBeInTheDocument();
    });

    test('prop:closeModalLabel is used for the (icon) button', () => {
      render(
        <Dialog.Root>
          <CardsQueryModalHeader
            closeModalLabel={closeModalLabel}
            onClose={onCloseFn}
          />
        </Dialog.Root>
      );

      expect(screen.getByLabelText(closeModalLabel)).toBeInTheDocument();
    });

    test('prop:onClose is invoked when the (icon) button is clicked', async () => {
      render(
        <Dialog.Root>
          <CardsQueryModalHeader
            closeModalLabel={closeModalLabel}
            onClose={onCloseFn}
          />
        </Dialog.Root>
      );

      expect(onCloseFn).not.toHaveBeenCalled();

      await userEvent.click(screen.getByLabelText(closeModalLabel));

      expect(onCloseFn).toHaveBeenCalled();
    });
  });
});
