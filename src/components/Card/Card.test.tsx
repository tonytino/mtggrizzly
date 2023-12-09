import { React, render, screen, userEvent } from 'test-utils';
import type { Card as CardType } from '@/types';
import { Card } from './Card';
import SingleFaceCard from './SingleFaceCard.sample.json';
import MultiFaceCard from './MultiFaceCard.sample.json';

// CardType is still being refined and doesn't accurately reflect what each card
// object may contain
const singleFaceCard = SingleFaceCard as unknown as CardType;
const multiFaceCard = MultiFaceCard as unknown as CardType;
const multiFaceCardFrontSide = multiFaceCard.card_faces[0];
const multiFaceCardBackSide = multiFaceCard.card_faces[1];

describe('<Card />', () => {
  describe('features', () => {
    describe('when the card has one face', () => {
      test('renders the card image', () => {
        render(<Card card={singleFaceCard} />);

        const cardImage = screen.getByAltText(singleFaceCard.name);

        expect(cardImage).toBeInTheDocument();
        expect(cardImage).toHaveAttribute(
          'src',
          singleFaceCard.image_uris.normal
        );
      });

      test('does not render a button or transform indicator', () => {
        render(<Card card={singleFaceCard} />);

        const transformCardButton = screen.queryByRole('button');
        const transformCardIndicator =
          screen.queryByLabelText('Transform card');

        expect(transformCardButton).not.toBeInTheDocument();
        expect(transformCardIndicator).not.toBeInTheDocument();
      });
    });

    describe('when the card has two faces', () => {
      test('a multi-face indicator is presented', () => {
        render(<Card card={multiFaceCard} />);

        const transformCardIndicator = screen.getByLabelText('Transform card');

        expect(transformCardIndicator).toBeInTheDocument();
      });

      test('the alternate face is presented on card click', async () => {
        render(<Card card={multiFaceCard} />);

        const transformCardButton = screen.getByRole('button');
        let frontSideCardImage = screen.getByAltText(
          multiFaceCardFrontSide.name
        );
        let backSideCardImage = screen.getByAltText(multiFaceCardBackSide.name);

        expect(
          screen.getByLabelText('See the back side of the card')
        ).toBeInTheDocument();
        expect(frontSideCardImage).toBeInTheDocument();
        expect(frontSideCardImage).toBeVisible();
        expect(frontSideCardImage).toHaveAttribute(
          'src',
          multiFaceCardFrontSide.image_uris.normal
        );
        expect(backSideCardImage).toBeInTheDocument();
        expect(backSideCardImage).not.toBeVisible();
        expect(backSideCardImage).toHaveAttribute(
          'src',
          multiFaceCardBackSide.image_uris.normal
        );

        await userEvent.click(transformCardButton);

        frontSideCardImage = screen.queryByAltText(multiFaceCardFrontSide.name);
        backSideCardImage = screen.getByAltText(multiFaceCardBackSide.name);

        expect(
          screen.getByLabelText('See the front side of the card')
        ).toBeInTheDocument();
        expect(frontSideCardImage).not.toBeInTheDocument();
        expect(backSideCardImage).toBeInTheDocument();
        expect(backSideCardImage).toBeVisible();

        await userEvent.click(transformCardButton);

        frontSideCardImage = screen.getByAltText(multiFaceCardFrontSide.name);
        backSideCardImage = screen.getByAltText(multiFaceCardBackSide.name);

        expect(
          screen.getByLabelText('See the back side of the card')
        ).toBeInTheDocument();
        expect(frontSideCardImage).toBeInTheDocument();
        expect(frontSideCardImage).toBeVisible();
        expect(backSideCardImage).toBeInTheDocument();
        expect(backSideCardImage).not.toBeVisible();
      });
    });

    describe('prop: isPriority', () => {
      test('renders the card image eagerly', () => {
        render(
          <Card
            card={singleFaceCard}
            isPriority
          />
        );

        const cardImage = screen.getByAltText(singleFaceCard.name);

        expect(cardImage).toBeInTheDocument();
        expect(cardImage).toHaveAttribute('loading', 'eager');
      });
    });
  });
});
