import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { amplify } from './amplifier';

export default class DaySevenSolution extends Solution {
  public async executeFirstHalf() {
    let program;
    await processFile(this.file, line => {
      program = line.split(',').map(x => +x);
    });
    return amplify(program);
  }
}
