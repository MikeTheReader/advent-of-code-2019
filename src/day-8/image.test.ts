import { breakUpLayers, checksum, countOccurences, mergeLayers } from './image';

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
  describe('breakUpLayers', () => {
    it('returns correct layers based on example data', () => {
      expect(breakUpLayers({ width: 3, height: 2 }, '123456789012')).toEqual([
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 0, 1, 2]
      ]);
    });
  });
  describe('checksum', () => {
    const layers = [
      {
        0: 10,
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0
      },
      {
        0: 3,
        1: 10,
        2: 5,
        3: 1,
        4: 1,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0
      }
    ];
    expect(checksum(layers)).toBe(50);
  });
  describe('mergeLayers', () => {
    it('returns correct results based on example data', () => {
      const data = '0222112222120000';
      const layers = breakUpLayers({ height: 3, width: 2 }, data);
      expect(mergeLayers(layers)).toEqual('0110');
    });
  });
});
