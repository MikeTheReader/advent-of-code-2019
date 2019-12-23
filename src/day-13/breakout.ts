export function countBlocks(output: number[]): number {
  let count = 0;
  for (let i = 2; i < output.length; i += 3) {
    if (output[i] === 2) {
      count++;
    }
  }
  return count;
}
