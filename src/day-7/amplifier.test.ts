import { amplify, feedback, getAllPermutations } from './amplifier';

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
  describe('amplify', () => {
    it('returns the correct values for example data', () => {
      const program1 = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
      expect(amplify(program1)).toBe(43210);

      const program2 = [
        3,
        23,
        3,
        24,
        1002,
        24,
        10,
        24,
        1002,
        23,
        -1,
        23,
        101,
        5,
        23,
        23,
        1,
        24,
        23,
        23,
        4,
        23,
        99,
        0,
        0
      ];
      expect(amplify(program2)).toBe(54321);

      const program3 = [
        3,
        31,
        3,
        32,
        1002,
        32,
        10,
        32,
        1001,
        31,
        -2,
        31,
        1007,
        31,
        0,
        33,
        1002,
        33,
        7,
        33,
        1,
        33,
        31,
        31,
        1,
        32,
        31,
        31,
        4,
        31,
        99,
        0,
        0,
        0
      ];
      expect(amplify(program3)).toBe(65210);
    });
  });
  describe.only('feedback', () => {
    it('gets correct results based on examples', () => {
      expect(
        feedback([
          3,
          26,
          1001,
          26,
          -4,
          26,
          3,
          27,
          1002,
          27,
          2,
          27,
          1,
          27,
          26,
          27,
          4,
          27,
          1001,
          28,
          -1,
          28,
          1005,
          28,
          6,
          99,
          0,
          0,
          5
        ])
      ).toBe(139629729);
    });
  });
});
