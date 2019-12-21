import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { IntCode } from './intcodeV11';
import { Color, Robot } from './robot';

export default class DayElevenSolution extends Solution {
  public async executeFirstHalf() {
    const robot = await this.paintTheShip();
    return robot.getPaintedPanels();
  }

  public async executeSecondHalf() {
    const robot = await this.paintTheShip(false, Color.White);
    return `\n${robot.toString()}`;
  }

  private async paintTheShip(log: boolean = true, initialColor: Color = Color.Black) {
    let program;
    await processFile(this.file, line => (program = line.split(',').map(x => +x)));
    const robot = new Robot(initialColor);
    const inputs = [];
    const intCode = new IntCode(program);
    let index = 0;
    robot.paint((color: Color) => {
      inputs.push(color);
      const output = intCode.runProgram(inputs).output;
      const currentOutput = output.slice(2 * index, 2 * index + 2);
      index++;
      if (log) {
        // tslint:disable-next-line: no-console
        console.log(`Iterations untils complete: ${output.length - index * 2}`);
      }
      return currentOutput;
    });
    return robot;
  }
}
