import Solution from "../solution-base";
import { processFile } from "../utils/file-reader";
import { runProgram } from "./intcode";

export default class DayTwoSolution extends Solution {
  public async executeFirstHalf() {
    let program: number[];
    await processFile(this.file, line => {
      program = line.split(",").map(x => +x);
    });
    program[1] = 12;
    program[2] = 2;
    const results = runProgram(program);
    return results[0];
  }

  public async executeSecondHalf() {
    const goalResult = 19690720;
    let program: number[];
    await processFile(this.file, line => {
      program = line.split(",").map(x => +x);
    });
    let noun = 0;
    let verb = 0;
    let completed = false;
    for (noun = 0; noun < 100; noun++) {
      for (verb = 0; verb < 100; verb++) {
        const memory = program.slice();
        memory[1] = noun;
        memory[2] = verb;
        const result = runProgram(memory)[0];
        if (result === goalResult) {
          completed = true;
          break;
        }
      }
      if (completed) {
        break;
      }
    }
    return 100 * noun + verb;
  }
}
