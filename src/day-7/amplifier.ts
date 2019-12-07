import { runProgram } from './intcode';

export function amplify(program: number[]): number {
  const permutations = getAllPermutations([0, 1, 2, 3, 4]);
  let largestOutput = -1;
  permutations.forEach(phases => {
    const aProgramResults = runProgram(program, [phases[0], 0]);
    const bProgramResults = runProgram(program, [phases[1], aProgramResults.output[0]]);
    const cProgramResults = runProgram(program, [phases[2], bProgramResults.output[0]]);
    const dProgramResults = runProgram(program, [phases[3], cProgramResults.output[0]]);
    const eProgramResults = runProgram(program, [phases[4], dProgramResults.output[0]]);

    largestOutput = Math.max(largestOutput, eProgramResults.output[0]);
  });
  return largestOutput;
}

export function getAllPermutations(original: number[]): number[][] {
  const permutations = [];
  function permute(digits: number[], size: number, n: number) {
    if (size === 1) {
      permutations.push(digits.slice());
    }
    for (let i = 0; i < size; i++) {
      permute(digits, size - 1, n);

      if (size % 2 === 1) {
        const buffer = digits[0];
        digits[0] = digits[size - 1];
        digits[size - 1] = buffer;
      } else {
        const buffer = digits[i];
        digits[i] = digits[size - 1];
        digits[size - 1] = buffer;
      }
    }
  }
  permute(original, original.length, original.length);
  return permutations;
}
