import { isValidPassword } from "./password";

describe("password", () => {
  describe("isValidPassword", () => {
    it("returns expected results for sample data", () => {
      expect(isValidPassword(111111)).toBe(true);
      expect(isValidPassword(223450)).toBe(false); // not increasing numbers
      expect(isValidPassword(123789)).toBe(false); // no double digit
    });
  });
});
