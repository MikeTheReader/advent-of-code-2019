import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { calculateFuelWithOre, calculateOre } from './reactions';

export default class DayFourteenSolution extends Solution {
  public async executeFirstHalf() {
    const reactionStrings: string[] = [];
    await processFile(this.file, line => reactionStrings.push(line));
    return calculateOre(reactionStrings);
  }

  public async executeSecondHalf() {
    const reactionStrings: string[] = [];
    await processFile(this.file, line => reactionStrings.push(line));
    return calculateFuelWithOre(reactionStrings, 1000000000000);
  }
}
