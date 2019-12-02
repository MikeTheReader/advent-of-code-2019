export interface ProgramMatch {
  noun: number;
  verb: number;
}

export function runProgram(commands: number[]): number[] {
  for (let i = 0; i < commands.length; i += 4) {
    const command = commands[i];
    const firstIndex = commands[i + 1];
    const secondIndex = commands[i + 2];
    const resultIndex = commands[i + 3];
    if (command === 99) {
      break;
    }

    commands[resultIndex] =
      command === 1
        ? commands[firstIndex] + commands[secondIndex]
        : commands[firstIndex] * commands[secondIndex];
  }
  return commands;
}

export function findMatchingInput(
  desiredResult: number,
  commands: number[]
): ProgramMatch {
  let noun = 0;
  let verb = 0;
  let completed = false;
  for (noun = 0; noun < 100; noun++) {
    for (verb = 0; verb < 100; verb++) {
      const memory = commands.slice();
      memory[1] = noun;
      memory[2] = verb;
      const result = runProgram(memory)[0];
      if (result === desiredResult) {
        completed = true;
        break;
      }
    }
    if (completed) {
      break;
    }
  }
  return { noun, verb };
}
