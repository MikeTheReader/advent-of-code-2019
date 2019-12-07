import { runProgram } from './intcode';

export function feedback(program: number[]): number {
  const phaseInputs = [5, 6, 7, 8, 9];
  const permutations = getAllPermutations(phaseInputs);
  let largestOutput = -1;
  permutations.forEach(phases => {
    let currentOutput = 0;
    let iteration = 0;
    const aInputs = [phases[0], 0];
    const bInputs = [phases[1]];
    const cInputs = [phases[2]];
    const dInputs = [phases[3]];
    const eInputs = [phases[4]];
    while (true) {
      const aProgramResults = runProgram(program, aInputs);
      if (aProgramResults.output.length < iteration + 1) {
        break;
      }
      bInputs.push(aProgramResults.output[iteration]);
      const bProgramResults = runProgram(program, bInputs);
      if (bProgramResults.output.length < iteration + 1) {
        break;
      }
      cInputs.push(bProgramResults.output[iteration]);
      const cProgramResults = runProgram(program, cInputs);
      if (cProgramResults.output.length < iteration + 1) {
        break;
      }
      dInputs.push(cProgramResults.output[iteration]);
      const dProgramResults = runProgram(program, dInputs);
      if (dProgramResults.output.length < iteration + 1) {
        break;
      }
      eInputs.push(dProgramResults.output[iteration]);
      const eProgramResults = runProgram(program, eInputs);
      if (eProgramResults.output.length < iteration + 1) {
        break;
      }
      aInputs.push(eProgramResults.output[iteration]);
      currentOutput = eProgramResults.output[iteration];
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
