import Grid, { Coordinate, Dimensions } from '../utils/grid';

const characterMap = {
  0: ' ',
  1: '|',
  2: '#',
  3: '_',
  4: 'o'
};

export function countBlocks(output: number[]): number {
  let count = 0;
  for (let i = 2; i < output.length; i += 3) {
    if (output[i] === 2) {
      count++;
    }
  }
  return count;
}

export function findBall(output: number[]): Coordinate {
  let i = 2;
  let x = 0;
  let y = 0;
  for (; i < output.length; i += 3) {
    if (output[i] === 4) {
      x = output[i - 2];
      y = output[i - 1];
    }
  }
  return { x, y };
}

export function findPaddle(output: number[]): Coordinate {
  let i = 2;
  let x = 0;
  let y = 0;
  for (; i < output.length; i += 3) {
    if (output[i] === 3) {
      x = output[i - 2];
      y = output[i - 1];
    }
  }
  return { x, y };
}

export function paintScreen(dimensions: Dimensions, output: number[]): string {
  const grid = new Grid<string>();
  grid.fill(' ', dimensions);
  let score;
  for (let i = 2; i < output.length; i += 3) {
    const x = output[i - 2];
    const y = output[i - 1];
    if (x === -1 && y === 0) {
      score = output[i];
    } else {
      grid.setValue({ x, y }, characterMap[output[i]]);
    }
  }
  let screen = grid.toString();
  if (score !== undefined) {
    screen += `\nScore: ${score}`;
  }
  return screen;
}

export function getScore(output: number[]) {
  let score = 0;
  for (let i = 2; i < output.length; i += 3) {
    const x = output[i - 2];
    const y = output[i - 1];
    if (x === -1 && y === 0) {
      score = output[i];
    }
  }
  return score;
}
