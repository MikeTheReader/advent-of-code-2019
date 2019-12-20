import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { AsteroidMap } from './asteroids';

export default class DayTenSolution extends Solution {
  public async executeFirstHalf() {
    let mapStr = '';
    await processFile(this.file, line => (mapStr += line + '\n'));
    const map = new AsteroidMap(mapStr);
    return map.findBestStation();
  }

  public async executeSecondHalf() {
    let mapStr = '';
    await processFile(this.file, line => (mapStr += line + '\n'));
    const map = new AsteroidMap(mapStr);
    const destroyedAsteroids = map.obliterate({ x: 23, y: 20 });
    const targetAsteroid = destroyedAsteroids[199];
    return targetAsteroid.x * 100 + targetAsteroid.y;
  }
}
