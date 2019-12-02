import Solution from "../solution-base";
import { processFile } from "../utils/file-reader";
import { calculateFuelCost, calculateRecursiveFuelCost } from "./fuel";

export default class DayOneSolution extends Solution {
  public async executeFirstHalf() {
    let total = 0;
    await processFile(this.file, line => {
      total += calculateFuelCost(+line);
    });
    return total;
  }

  public async executeSecondHalf() {
    let total = 0;
    await processFile(this.file, line => {
      total += calculateRecursiveFuelCost(+line);
    });
    return total;
  }
}
