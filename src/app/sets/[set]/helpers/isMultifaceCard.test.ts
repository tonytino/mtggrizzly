import type { Card as CardType } from '@/types';
import { isMultifaceCard } from './isMultifaceCard';

const singleFaceCard = {
  card_faces: [],
} as unknown as CardType;

const multiFaceCard = {
  card_faces: [{}, {}],
} as unknown as CardType;

describe('isMultifaceCard()', () => {
  describe('when the card has a single face', () => {
    test('returns false', () => {
      expect(isMultifaceCard(singleFaceCard)).toBe(false);
    });
  });

  describe('when the card has multiple faces', () => {
    test('returns true', () => {
      expect(isMultifaceCard(multiFaceCard)).toBe(true);
    });
  });
});
