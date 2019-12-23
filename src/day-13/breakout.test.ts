import { countBlocks } from './breakout';

describe('breakout', () => {
  describe('countBlocks', () => {
    it('counts the blocks in a set of output', () => {
      const output = [1, 2, 2, 3, 3, 2, 4, 4, 2, 4, 4, 3];
      expect(countBlocks(output)).toEqual(3);
    });
  });
});
