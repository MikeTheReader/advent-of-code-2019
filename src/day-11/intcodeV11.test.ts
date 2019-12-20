import { IntCode, parseOpcode } from './intcodeV11';

describe('intcode-day-7', () => {
  describe('new IntCode', () => {
    it('returns expected results based on examples', () => {
      expect(new IntCode([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]).runProgram().commands).toEqual([
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

      expect(new IntCode([1, 0, 0, 0, 99]).runProgram().commands).toEqual([2, 0, 0, 0, 99]);

      expect(new IntCode([2, 3, 0, 3, 99]).runProgram().commands).toEqual([2, 3, 0, 6, 99]);

      expect(new IntCode([2, 4, 4, 5, 99, 0]).runProgram().commands).toEqual([2, 4, 4, 5, 99, 9801]);

      expect(new IntCode([1, 1, 1, 4, 99, 5, 6, 0, 99]).runProgram().commands).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
    });
    it('handles the 3 and 4 opcodes', () => {
      expect(new IntCode([3, 0, 4, 0, 99]).runProgram([1]).output).toEqual([1]);
    });
    it('handles the 5 and 6 codes in parameter mode', () => {
      const intcode = new IntCode([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]);
      expect(intcode.runProgram([0]).output).toEqual([0]);
      expect(intcode.runProgram([25]).output).toEqual([1]);
    });
    it('handles the 5 and 6 codes in immediate mode', () => {
      const intcode = new IntCode([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]);
      expect(intcode.runProgram([0]).output).toEqual([0]);
      expect(intcode.runProgram([234]).output).toEqual([1]);
    });
    it('handles the 7 and 8 codes', () => {
      expect(new IntCode([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]).runProgram([8]).output).toEqual([1]);
      expect(new IntCode([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]).runProgram([25]).output).toEqual([0]);
      expect(new IntCode([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]).runProgram([7]).output).toEqual([1]);
      expect(new IntCode([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]).runProgram([9]).output).toEqual([0]);

      expect(new IntCode([3, 3, 1108, -1, 8, 3, 4, 3, 99]).runProgram([8]).output).toEqual([1]);
      expect(new IntCode([3, 3, 1108, -1, 8, 3, 4, 3, 99]).runProgram([25]).output).toEqual([0]);
      expect(new IntCode([3, 3, 1107, -1, 8, 3, 4, 3, 99]).runProgram([7]).output).toEqual([1]);
      expect(new IntCode([3, 3, 1107, -1, 8, 3, 4, 3, 99]).runProgram([9]).output).toEqual([0]);
    });
    it('handles a complex set with input and output that are not the same', () => {
      // Take the first input, store it in 0
      // Take the first input, add 105 and store it in 0
      // Output the value in 0
      // Stop
      expect(new IntCode([3, 0, 1, 0, 9, 0, 4, 0, 99, 105]).runProgram([100]).output).toEqual([205]);
    });
    it('handles a complex set with input and output that use opcodes', () => {
      // Take the first input, store it in 0
      // Take the first input, add 9 and store it in 0
      // Output the value in 0
      // Stop
      expect(new IntCode([3, 0, 1001, 0, 9, 0, 4, 0, 99, 105]).runProgram([100]).output).toEqual([109]);
    });
    it('handles position mode for opcode 4 too', () => {
      // Take the first input, store it in 0
      // Take the first input, add 9 and store it in 0
      // Output the value in 0
      // Stop
      expect(new IntCode([3, 0, 104, 0, 99]).runProgram([100]).output).toEqual([0]);
    });
    it('handles v9 programs -- relative position and relative position modification', () => {
      expect(
        new IntCode([109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99]).runProgram().output
      ).toEqual([109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99]);
      expect(new IntCode([1102, 34915192, 34915192, 7, 4, 7, 99, 0]).runProgram().output[0].toString()).toHaveLength(
        16
      );
      expect(new IntCode([104, 1125899906842624, 99]).runProgram().output[0]).toBe(1125899906842624);
    });
    it('handles additional test cases', () => {
      expect(new IntCode([109, -1, 204, 1, 99]).runProgram().output[0]).toBe(109);
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
