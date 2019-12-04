import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { findMatchingInput, runProgram } from './intcode';

export default class DayTwoSolution extends Solution {
  public async executeFirstHalf() {
    let program: number[];
    await processFile(this.file, line => {
      program = line.split(',').map(x => +x);
    });
    program[1] = 12;
    program[2] = 2;
    const results = runProgram(program);
    return results[0];
  }

  public async executeSecondHalf() {
    const goalResult = 19690720;
    let program: number[];
    await processFile(this.file, line => {
      program = line.split(',').map(x => +x);
    });
    const matching = findMatchingInput(goalResult, program);
    return 100 * matching.noun + matching.verb;
  }
}
