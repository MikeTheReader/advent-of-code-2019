import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { runProgram } from './thermal';

export default class DayFiveSolution extends Solution {
  public async executeFirstHalf() {
    let day5input: number[];
    await processFile(this.file, line => {
      day5input = line.split(',').map(x => +x);
    });
    return runProgram(day5input, [1]).output;
  }
}
