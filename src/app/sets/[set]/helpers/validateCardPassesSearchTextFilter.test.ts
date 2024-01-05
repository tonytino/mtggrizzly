import type { Card as CardType } from '@/types';
import { validateCardPassesSearchTextFilter } from './validateCardPassesSearchTextFilter';

const singleFaceCard = {
  card_faces: [],
  name: 'blah NAME blah',
  oracle_text: 'blah ORACLE_TEXT blah',
  type_line: 'blah TYPE_LINE blah',
} as unknown as CardType;

const multiFaceCard = {
  card_faces: [
    {
      name: 'blah FRONT_NAME blah',
      oracle_text: 'blah FRONT_ORACLE_TEXT blah',
      type_line: 'blah FRONT_TYPE_LINE blah',
    },
    {
      name: 'blah BACK_NAME blah',
      oracle_text: 'blah BACK_ORACLE_TEXT blah',
      type_line: 'blah BACK_TYPE_LINE blah',
    },
  ],
} as unknown as CardType;

describe('validateCardPassesSearchTextFilter()', () => {
  describe('when the card has a single face', () => {
    describe('and matches the search text', () => {
      test('returns true', () => {
        expect(validateCardPassesSearchTextFilter(singleFaceCard, 'name')).toBe(
          true
        );
        expect(
          validateCardPassesSearchTextFilter(singleFaceCard, 'oracle_text')
        ).toBe(true);
        expect(
          validateCardPassesSearchTextFilter(singleFaceCard, 'type_line')
        ).toBe(true);
      });
    });

    describe('and does NOT match the search text', () => {
      test('returns false', () => {
        expect(
          validateCardPassesSearchTextFilter(singleFaceCard, 'missing')
        ).toBe(false);
      });
    });
  });

  describe('when the card has multiple faces', () => {
    describe('and matches the search text', () => {
      test('returns true', () => {
        expect(
          validateCardPassesSearchTextFilter(multiFaceCard, 'front_name')
        ).toBe(true);
        expect(
          validateCardPassesSearchTextFilter(multiFaceCard, 'front_oracle_text')
        ).toBe(true);
        expect(
          validateCardPassesSearchTextFilter(multiFaceCard, 'front_type_line')
        ).toBe(true);
        expect(
          validateCardPassesSearchTextFilter(multiFaceCard, 'back_name')
        ).toBe(true);
        expect(
          validateCardPassesSearchTextFilter(multiFaceCard, 'back_oracle_text')
        ).toBe(true);
        expect(
          validateCardPassesSearchTextFilter(multiFaceCard, 'back_type_line')
        ).toBe(true);
      });
    });

    describe('and does NOT match the search text', () => {
      test('returns false', () => {
        expect(
          validateCardPassesSearchTextFilter(multiFaceCard, 'missing')
        ).toBe(false);
      });
    });
  });
});
