import { IntCode } from '../day-11/intcodeV11';
import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { findOxygenSteps } from './repair';

export default class DayFifteenSolution extends Solution {
  public async executeFirstHalf() {
    let program: number[];
    await processFile(this.file, line => (program = line.split(',').map(x => +x)));
    const intCode = new IntCode(program);
    return findOxygenSteps(intCode);
  }
}
