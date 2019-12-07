import { getAllPermutations } from './amplifier';

describe('amplifier', () => {
  describe('getAllPermutations', () => {
    it('returns all the given permutations for an array order', () => {
      const array = [0, 1, 2, 3, 4];
      const expectedTotal = 120;
      const permutations = getAllPermutations(array);
      expect(permutations.length).toBe(expectedTotal);
      expect(permutations[0] === permutations[10]).toBe(false);
    });
  });
});
