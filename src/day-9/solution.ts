import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { runProgram } from './intcodeV9';

export default class DayNineSolution extends Solution {
  public async executeFirstHalf() {
    let program: number[];
    await processFile(this.file, line => {
      program = line.split(',').map(x => +x);
    });
    return runProgram(program, [1]).output;
  }
}
