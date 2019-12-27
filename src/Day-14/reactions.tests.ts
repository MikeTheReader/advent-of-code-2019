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
          ]
        }
      });
    });
  });
});
