export interface Command {
  command: number;
  modes: number[];
  length: number;
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
      command === 1 ? commands[firstIndex] + commands[secondIndex] : commands[firstIndex] * commands[secondIndex];
  }
  return commands;
}

export function parseOpcode(code: number): Command {
  return null;
}
