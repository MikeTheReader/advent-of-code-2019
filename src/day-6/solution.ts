import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { Galaxy } from './galaxy';

export default class DaySixSolution extends Solution {
  public async executeFirstHalf() {
    const galaxy = new Galaxy();
    await processFile(this.file, line => {
      galaxy.addOrbit(line);
    });
    return galaxy.countOrbits();
  }
}
