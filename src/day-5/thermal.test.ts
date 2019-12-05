import { parseOpcode, runProgram } from './thermal';

describe('thermal', () => {
  describe('runProgram', () => {
    it('returns expected results based on examples', () => {
      expect(runProgram([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])).toEqual([
        3500,
        9,
        10,
        70,
        2,
        3,
        11,
        0,
        99,
        30,
        40,
        50
      ]);

      expect(runProgram([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99]);

      expect(runProgram([2, 3, 0, 3, 99])).toEqual([2, 3, 0, 6, 99]);

      expect(runProgram([2, 4, 4, 5, 99, 0])).toEqual([2, 4, 4, 5, 99, 9801]);

      expect(runProgram([1, 1, 1, 4, 99, 5, 6, 0, 99])).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
    });
  });
  describe('parseOpcode', () => {
    it('returns the correct data for simple opcodes', () => {
      expect(parseOpcode(1)).toEqual({
        command: 1,
        modes: [0, 0, 0],
        length: 4
      });
      expect(parseOpcode(2)).toEqual({
        command: 2,
        modes: [0, 0, 0],
        length: 4
      });
      expect(parseOpcode(3)).toEqual({
        command: 3,
        modes: [0],
        length: 2
      });
      expect(parseOpcode(4)).toEqual({
        command: 4,
        modes: [0],
        length: 2
      });
      expect(parseOpcode(99)).toEqual({
        command: 99,
        modes: [],
        length: 1
      });
    });
    it('returns the correct data for complex opcodes', () => {
      expect(parseOpcode(1002)).toEqual({
        command: 2,
        modes: [0, 1, 0],
        length: 4
      });
      expect(parseOpcode(11101)).toEqual({
        command: 1,
        modes: [1, 1, 1],
        length: 4
      });
    });
  });
});
