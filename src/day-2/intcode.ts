export function runProgram(commands: number[]): number[] {
  for (let i = 0; i < commands.length; i += 4) {
    const command = commands[i];
    const firstIndex = commands[i + 1];
    const secondIndex = commands[i + 2];
    const resultIndex = commands[i + 3];
    if (command === 99) {
      break;
    }
    if (command === 1) {
      commands[resultIndex] = commands[firstIndex] + commands[secondIndex];
    } else if (command === 2) {
      commands[resultIndex] = commands[firstIndex] * commands[secondIndex];
    }
  }
  return commands;
}
