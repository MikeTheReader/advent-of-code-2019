import { isReallyValidPassword, isValidPassword } from './password';

describe('password', () => {
  describe('isValidPassword', () => {
    it('returns expected results for sample data', () => {
      expect(isValidPassword(111111)).toBe(true);
      expect(isValidPassword(223450)).toBe(false); // not increasing numbers
      expect(isValidPassword(123789)).toBe(false); // no double digit

      expect(isValidPassword(122345)).toBe(true);
      expect(isValidPassword(599896)).toBe(false);

      expect(isValidPassword(11111111)).toBe(false); // too many digits
    });

    it('returns expected results for second half sample data', () => {
      expect(isReallyValidPassword(112233)).toBe(true);
      expect(isReallyValidPassword(123444)).toBe(false);
      expect(isReallyValidPassword(111122)).toBe(true);

      expect(isReallyValidPassword(111111)).toBe(false);
      expect(isReallyValidPassword(223450)).toBe(false); // not increasing numbers
      expect(isReallyValidPassword(123789)).toBe(false); // no double digit

      expect(isReallyValidPassword(122345)).toBe(true);
      expect(isReallyValidPassword(599896)).toBe(false);

      expect(isReallyValidPassword(11111111)).toBe(false); // too many digits
    });
  });
});
