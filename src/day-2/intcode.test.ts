import { runProgram } from "./intcode";

describe("intcode", () => {
  describe("runProgram", () => {
    it("returns expected results based on examples", () => {
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

      expect(runProgram([1, 1, 1, 4, 99, 5, 6, 0, 99])).toEqual([
        30,
        1,
        1,
        4,
        2,
        5,
        6,
        0,
        99
      ]);
    });
  });
});
