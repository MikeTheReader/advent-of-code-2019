import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { runProgram } from './intcodeV9';

export default class DayNineSolution extends Solution {
  public async initProgram(): Promise<number[]> {
    let program: number[];
    await processFile(this.file, line => {
      program = line.split(',').map(x => +x);
    });
    return program;
  }

  public async executeFirstHalf() {
    const program = await this.initProgram();
    return runProgram(program, [1]).output[0];
  }

  public async executeSecondHalf() {
    const program = await this.initProgram();
    return runProgram(program, [2]).output[0];
  }
}
