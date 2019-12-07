import { runProgram } from './intcode';

export function feedback(program: number[]): number {
  const phaseInputs = [5, 6, 7, 8, 9];
  const permutations = getAllPermutations(phaseInputs);
  let largestOutput = -1;
  permutations.forEach(phases => {
    let currentOutput = 0;
    let iteration = 0;
    const amplifierInputs = [[phases[0], 0], [phases[1]], [phases[2]], [phases[3]], [phases[4]]];
    let done = false;
    let amplifierResults;
    while (!done) {
      for (let amp = 0; amp < amplifierInputs.length; amp++) {
        amplifierResults = runProgram(program, amplifierInputs[amp]);
        if (amplifierResults.output.length < iteration + 1) {
          done = true;
          break;
        }
        const nextAmp = amp + 1 === amplifierInputs.length ? 0 : amp + 1;
        amplifierInputs[nextAmp].push(amplifierResults.output[iteration]);
      }
      // The last input of the first amplifier will always be
      // the most recent value from the last amplifier
      currentOutput = amplifierInputs[0][amplifierInputs[0].length - 1];
      iteration++;
    }

    largestOutput = Math.max(largestOutput, currentOutput);
  });

  return largestOutput;
}

export function amplify(program: number[]): number {
  const permutations = getAllPermutations([0, 1, 2, 3, 4]);
  let largestOutput = -1;
  permutations.forEach(phases => {
    let currentInput = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < phases.length; i++) {
      const programResults = runProgram(program, [phases[i], currentInput]);
      currentInput = programResults.output[0];
    }

    largestOutput = Math.max(largestOutput, currentInput);
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
