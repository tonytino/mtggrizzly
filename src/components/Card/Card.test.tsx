import { React, render, screen } from 'test-utils';
import { Card } from './Card';
import SampleCard from './Card.sample.json';
import type { Card as CardType } from '@/types';

// CardType is still being refined and doesn't accurately reflect what each card
// object may contain
const card = SampleCard as unknown as CardType;

describe('<Card />', () => {
  describe('features', () => {
    test('renders the card image alongside the card name', () => {
      render(<Card card={card} />);

      const cardImage = screen.getByAltText(card.name);
      const cardName = screen.getByText(card.name);

      expect(cardImage).toBeInTheDocument();
      expect(cardImage).toHaveAttribute('src', card.image_uris.border_crop);
      expect(cardName).toBeInTheDocument();
    });
  });

  describe('prop: isPriority', () => {
    test('renders the card image eagerly', () => {
      render(
        <Card
          card={card}
          isPriority
        />
      );

      const cardImage = screen.getByAltText(card.name);

      expect(cardImage).toBeInTheDocument();
      expect(cardImage).toHaveAttribute('loading', 'eager');
    });
  });
});
