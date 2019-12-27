import { parseReaction } from './reactions';

describe('reactions', () => {
  describe('parseReaction', () => {
    it('returns expected data based on simple example', () => {
      const inputOne = '114 ORE => 4 BHXH';
      expect(parseReaction(inputOne)).toEqual({
        BHXH: {
          inputs: [
            {
              chemical: 'ORE',
              quantity: 114
            }
          ],
          outputQuantity: 4
        }
      });
    });
    it('returns expected data based on more complex example', () => {
      const inputOne = '1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP';
      expect(parseReaction(inputOne)).toEqual({
        XMNCP: {
          inputs: [
            {
              chemical: 'MZWV',
              quantity: 1
            },
            {
              chemical: 'XDBXC',
              quantity: 17
            },
            {
              chemical: 'XCVML',
              quantity: 3
            }
          ],
          outputQuantity: 2
        }
      });
    });
  });
});
