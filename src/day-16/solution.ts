import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { processSignal } from './transmission';

export default class DayFifteenSolution extends Solution {
  public async executeFirstHalf() {
    let signal;
    await processFile(this.file, line => (signal = line));
    return processSignal(signal, 100).substring(0, 8);
  }

  public async executeSecondHalf() {
    return 'not implemented';
  }
}
