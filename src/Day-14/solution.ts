import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { calculateOre } from './reactions';

export default class DayFourteenSolution extends Solution {
  public async executeFirstHalf() {
    const reactionStrings: string[] = [];
    await processFile(this.file, line => reactionStrings.push(line));
    return calculateOre(reactionStrings);
  }
}
