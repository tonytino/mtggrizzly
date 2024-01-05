import type { Card } from '@/types';
import { validateCardPassesCardTypesFilter } from './validateCardPassesCardTypesFilter';

const singleFaceCard = {
  card_faces: [],
  type_line: 'Creature — Human Wizard',
} as unknown as Card;

const multiFaceCard = {
  card_faces: [
    {
      type_line: 'Legendary Creature — God',
    },
    {
      type_line: 'Legendary Artifact',
    },
  ],
} as unknown as Card;

describe('validateCardPassesCardTypesFilter()', () => {
  describe('when the card has a single face', () => {
    describe('and matches some card types', () => {
      test('returns true', () => {
        expect(
          validateCardPassesCardTypesFilter(singleFaceCard, [
            'Creature',
            'Land',
          ])
        ).toBe(true);
      });
    });

    describe('and does NOT match any card types', () => {
      test('returns false', () => {
        expect(
          validateCardPassesCardTypesFilter(singleFaceCard, [
            'Artifact',
            'Enchantment',
          ])
        ).toBe(false);
      });
    });
  });

  describe('when the card has multiple faces', () => {
    describe('and matches some card types', () => {
      test('returns true', () => {
        expect(
          validateCardPassesCardTypesFilter(multiFaceCard, ['Creature', 'Land'])
        ).toBe(true);
        expect(
          validateCardPassesCardTypesFilter(multiFaceCard, [
            'Artifact',
            'Enchantment',
          ])
        ).toBe(true);
      });
    });

    describe('and does NOT match any card types', () => {
      test('returns false', () => {
        expect(
          validateCardPassesCardTypesFilter(multiFaceCard, ['Battle', 'Land'])
        ).toBe(false);
      });
    });
  });
});
