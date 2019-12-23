import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { countBlocks } from './breakout';
import { IntCode } from './intcodeV13';

export default class DayThirteenSolution extends Solution {
  public async executeFirstHalf() {
    let program: number[];
    await processFile(this.file, line => (program = line.split(',').map(x => +x)));
    const intCode = new IntCode(program);
    const results = intCode.runProgram();
    return countBlocks(results.output);
  }
}
