import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { breakUpLayers, checksum, countOccurences } from './image';

export default class DayEightSolution extends Solution {
  public async executeFirstHalf() {
    let image: string;
    await processFile(this.file, line => (image = line));
    const imageLayers = breakUpLayers({ height: 6, width: 25 }, image);
    const layerCounts = imageLayers.map(layer => countOccurences(layer));
    return checksum(layerCounts);
  }
}
