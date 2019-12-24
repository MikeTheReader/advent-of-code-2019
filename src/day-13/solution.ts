import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { countBlocks, findBall, findPaddle, getScore } from './breakout';
import { IntCode } from './intcodeV13';

export default class DayThirteenSolution extends Solution {
  public async executeFirstHalf() {
    let program: number[];
    await processFile(this.file, line => (program = line.split(',').map(x => +x)));
    const intCode = new IntCode(program);
    const results = intCode.runProgram();
    return countBlocks(results.output);
  }

  public async executeSecondHalf() {
    let program: number[];
    await processFile(this.file, line => (program = line.split(',').map(x => +x)));
    program[0] = 2;
    const intCode = new IntCode(program);
    const results = intCode.runProgram(output => {
      // uncomment these lines to see "animation" of game
      // console.clear();
      // console.log('\n' + paintScreen({ height: 25, width: 50 }, output))
      const ball = findBall(output);
      const paddle = findPaddle(output);
      let nextInput = 0;
      if (ball.x < paddle.x) {
        nextInput = -1;
      } else if (ball.x > paddle.x) {
        nextInput = 1;
      }
      return nextInput;
    });
    return getScore(results.output);
  }
}
