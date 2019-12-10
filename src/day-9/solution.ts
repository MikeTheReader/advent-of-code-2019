import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { IntCode } from './intcodeV9';

export default class DayNineSolution extends Solution {
  public async initProgram(): Promise<IntCode> {
    let program: number[];
    await processFile(this.file, line => {
      program = line.split(',').map(x => +x);
    });
    return new IntCode(program);
  }

  public async executeFirstHalf() {
    const intCode = await this.initProgram();
    return intCode.runProgram([1]).output[0];
  }

  public async executeSecondHalf() {
    const intCode = await this.initProgram();
    return intCode.runProgram([2]).output[0];
  }
}
