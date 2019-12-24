import { countBlocks, paintScreen } from './breakout';

describe('breakout', () => {
  describe('countBlocks', () => {
    it('counts the blocks in a set of output', () => {
      const output = [1, 2, 2, 3, 3, 2, 4, 4, 2, 4, 4, 3];
      expect(countBlocks(output)).toEqual(3);
    });
  });
  describe('paintScreen', () => {
    it('paints the screen correctly based on sample output', () => {
      const output = [1, 1, 1, 2, 2, 2, 3, 5, 3, 3, 4, 4];
      expect(paintScreen({ width: 5, height: 6 }, output)).toEqual(
        '          \n' + '  |       \n' + '    #     \n' + '          \n' + '      o   \n' + '      _   \n'
      );
    });
  });
});
