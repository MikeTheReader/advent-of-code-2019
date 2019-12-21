import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { calculateEnergy, parsePlanet, tick } from './space';

export default class DayTwelveSolution extends Solution {
  public async executeFirstHalf() {
    const planets = [];
    await processFile(this.file, line => {
      planets.push(parsePlanet(line));
    });
    for (let i = 0; i < 1000; i++) {
      tick(planets);
    }
    return planets.reduce((sum, planet) => (sum += calculateEnergy(planet)), 0);
  }
}
