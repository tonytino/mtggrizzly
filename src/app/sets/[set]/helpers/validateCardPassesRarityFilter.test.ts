import type { Card as CardType } from '@/types';
import { validateCardPassesRarityFilter } from './validateCardPassesRarityFilter';

const card = {
  rarity: 'uncommon',
} as unknown as CardType;

describe('validateCardPassesRarityFilter()', () => {
  describe('when the card rarity is permitted', () => {
    test('returns true', () => {
      expect(validateCardPassesRarityFilter(card, ['uncommon', 'rare'])).toBe(
        true
      );
    });
  });

  describe('when the card rarity is NOT permitted', () => {
    test('returns false', () => {
      expect(validateCardPassesRarityFilter(card, ['common', 'mythic'])).toBe(
        false
      );
    });
  });
});
