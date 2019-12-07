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
  return sendThroughAmplifiers(program, [0, 1, 2, 3, 4]);
}

function sendThroughAmplifiers(program: number[], phaseInputs: number[]): number {
  const permutations = getAllPermutations(phaseInputs);
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
