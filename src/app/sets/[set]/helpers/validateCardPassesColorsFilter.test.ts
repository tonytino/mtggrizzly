import type { Card as CardType } from '@/types';
import { validateCardPassesColorsFilter } from './validateCardPassesColorsFilter';

const singleFaceCard = {
  card_faces: [],
  mana_cost: '{X}',
} as unknown as CardType;

const multiFaceCard = {
  card_faces: [
    {
      mana_cost: '{W}',
    },
    {
      mana_cost: '{1}{R}',
    },
  ],
} as unknown as CardType;

describe('validateCardPassesColorsFilter()', () => {
  describe('when the card has a single face', () => {
    describe('and matches some colors', () => {
      test('returns true', () => {
        expect(
          validateCardPassesColorsFilter(singleFaceCard, ['U', 'Colorless'])
        ).toBe(true);
      });
    });

    describe('and does NOT match any colors', () => {
      test('returns false', () => {
        expect(validateCardPassesColorsFilter(singleFaceCard, ['B', 'G'])).toBe(
          false
        );
      });
    });
  });

  describe('when the card has multiple faces', () => {
    describe('and matches some colors', () => {
      test('returns true', () => {
        expect(validateCardPassesColorsFilter(multiFaceCard, ['U', 'R'])).toBe(
          true
        );
        expect(validateCardPassesColorsFilter(multiFaceCard, ['W', 'B'])).toBe(
          true
        );
      });
    });

    describe('and does NOT match any colors', () => {
      test('returns false', () => {
        expect(
          validateCardPassesColorsFilter(multiFaceCard, ['Colorless', 'G'])
        ).toBe(false);
      });
    });
  });
});
