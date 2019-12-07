import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { amplify, feedback } from './amplifier';

export default class DaySevenSolution extends Solution {
  public async executeFirstHalf() {
    let program;
    await processFile(this.file, line => {
      program = line.split(',').map(x => +x);
    });
    return amplify(program);
  }

  public async executeSecondHalf() {
    let program;
    await processFile(this.file, line => {
      program = line.split(',').map(x => +x);
    });
    return feedback(program);
  }
}
