import Solution from "../solution-base";
import FileReader from "../utils/file-reader";
import { calculateFuelCost } from "./fuel";

export default class DayOneSolution extends Solution {
  public async executeFirstHalf() {
    let total = 0;
    const reader = new FileReader(line => {
      total += calculateFuelCost(+line);
    });
    await reader.processFile(this.file);
    return total;
  }
}
