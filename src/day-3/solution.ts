import Solution from "../solution-base";
import { processFile } from "../utils/file-reader";
import { Grid } from "./wires";

export default class DayThreeSolution extends Solution {
  public async executeFirstHalf() {
    const grid = new Grid();
    await processFile(this.file, line => grid.addWire(line));
    return grid.getSmallestDistance();
  }
}
