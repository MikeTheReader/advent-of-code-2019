import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { calculateOre } from './reactions';

export default class DayFourteenSolution extends Solution {
  public async executeFirstHalf() {
    const reactionStrings: string[] = [];
    await processFile(this.file, line => reactionStrings.push(line));
    return calculateOre(reactionStrings);
  }

  public async executeSecondHalf() {
    const orePerFuel = await this.executeFirstHalf();
    return Math.ceil(1000000000000 / orePerFuel);
  }
}
