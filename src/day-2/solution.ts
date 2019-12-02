import Solution from "../solution-base";
import FileReader from "../utils/file-reader";
import { runProgram } from "./intcode";

export default class DayTwoSolution extends Solution {
  public async executeFirstHalf() {
    let program: number[];
    const reader = new FileReader(line => {
      program = line.split(",").map(x => +x);
    });
    await reader.processFile(this.file);
    program[1] = 12;
    program[2] = 2;
    const results = runProgram(program);
    return results[0];
  }
}
