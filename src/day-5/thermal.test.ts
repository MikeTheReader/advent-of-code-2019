import { parseOpcode, runProgram } from './thermal';

describe('thermal', () => {
  describe('runProgram', () => {
    it('returns expected results based on examples', () => {
      expect(runProgram([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]).commands).toEqual([
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

      expect(runProgram([1, 0, 0, 0, 99]).commands).toEqual([2, 0, 0, 0, 99]);

      expect(runProgram([2, 3, 0, 3, 99]).commands).toEqual([2, 3, 0, 6, 99]);

      expect(runProgram([2, 4, 4, 5, 99, 0]).commands).toEqual([2, 4, 4, 5, 99, 9801]);

      expect(runProgram([1, 1, 1, 4, 99, 5, 6, 0, 99]).commands).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
    });
    it('handles the 3 and 4 opcodes', () => {
      expect(runProgram([3, 0, 4, 0, 99], [1]).output).toEqual([1]);
    });
    it('handles a complex set with input and output that are not the same', () => {
      // Take the first input, store it in 0
      // Take the first input, add 105 and store it in 0
      // Output the value in 0
      // Stop
      expect(runProgram([3, 0, 1, 0, 9, 0, 4, 0, 99, 105], [100]).output).toEqual([205]);
    });
    it('handles a complex set with input and output that use opcodes', () => {
      // Take the first input, store it in 0
      // Take the first input, add 9 and store it in 0
      // Output the value in 0
      // Stop
      expect(runProgram([3, 0, 1001, 0, 9, 0, 4, 0, 99, 105], [100]).output).toEqual([109]);
    });
    it('handles position mode for opcode 4 too', () => {
      // Take the first input, store it in 0
      // Take the first input, add 9 and store it in 0
      // Output the value in 0
      // Stop
      expect(runProgram([3, 0, 104, 0, 99], [100]).output).toEqual([0]);
    });
  });
  describe('parseOpcode', () => {
    it('returns the correct data for simple opcodes', () => {
      expect(parseOpcode(1)).toEqual({
        command: 1,
        modes: [0, 0, 0]
      });
      expect(parseOpcode(2)).toEqual({
        command: 2,
        modes: [0, 0, 0]
      });
      expect(parseOpcode(3)).toEqual({
        command: 3,
        modes: [0]
      });
      expect(parseOpcode(4)).toEqual({
        command: 4,
        modes: [0]
      });
      expect(parseOpcode(99)).toEqual({
        command: 99,
        modes: []
      });
    });
    it('returns the correct data for complex opcodes', () => {
      expect(parseOpcode(1002)).toEqual({
        command: 2,
        modes: [0, 1, 0]
      });
      expect(parseOpcode(11101)).toEqual({
        command: 1,
        modes: [1, 1, 1]
      });
    });
  });
});
