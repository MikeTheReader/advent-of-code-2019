import Solution from '../solution-base';
import { isReallyValidPassword, isValidPassword } from './password';

export default class DayFourSolution extends Solution {
  public async executeFirstHalf() {
    const rangeStart = 123257;
    const rangeEnd = 647015;
    const validPasswords = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (isValidPassword(i)) {
        validPasswords.push(i);
      }
    }
    return validPasswords.length;
  }

  public async executeSecondHalf() {
    const rangeStart = 123257;
    const rangeEnd = 647015;
    const validPasswords = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (isReallyValidPassword(i)) {
        validPasswords.push(i);
      }
    }
    return validPasswords.length;
  }
}
