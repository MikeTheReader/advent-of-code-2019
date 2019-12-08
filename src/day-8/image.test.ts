import { countOccurences } from './image';

describe('image', () => {
  describe('countOccurences', () => {
    it('returns the correct digit map', () => {
      expect(countOccurences([1, 2, 3, 4])).toEqual({
        0: 0,
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0
      });
      expect(countOccurences([5, 5, 5, 5, 5, 5])).toEqual({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 6,
        6: 0,
        7: 0,
        8: 0,
        9: 0
      });
    });
  });
});
