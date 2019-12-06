import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { runProgram } from './thermal';

export default class DayFiveSolution extends Solution {
  public async executeFirstHalf() {
    return this.runWithInput([1]);
  }

  public async executeSecondHalf() {
    return this.runWithInput([5]);
  }

  private async runWithInput(input: number[]) {
    let day5input: number[];
    await processFile(this.file, line => {
      day5input = line.split(',').map(x => +x);
    });
    return runProgram(day5input, input).output;
  }
}
