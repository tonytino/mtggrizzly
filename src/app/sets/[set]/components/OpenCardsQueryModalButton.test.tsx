// https://www.radix-ui.com/primitives/docs/components/dialog
import * as Dialog from '@radix-ui/react-dialog';
import { React, render, screen, userEvent } from 'test-utils';
import {
  OpenCardsQueryModalButton,
  buttonLabel,
} from './OpenCardsQueryModalButton';

const onClickFn = jest.fn();

describe('<OpenCardsQueryModalButton />', () => {
  describe('features', () => {
    test('renders a button with a label', () => {
      render(
        <Dialog.Root>
          <OpenCardsQueryModalButton onClick={onClickFn} />
        </Dialog.Root>
      );

      expect(screen.getByLabelText(buttonLabel)).toBeInTheDocument();
    });

    test('prop:onClick is invoked when the button is clicked', async () => {
      render(
        <Dialog.Root>
          <OpenCardsQueryModalButton onClick={onClickFn} />
        </Dialog.Root>
      );

      await userEvent.click(screen.getByLabelText(buttonLabel));

      expect(onClickFn).toHaveBeenCalled();
    });
  });
});
