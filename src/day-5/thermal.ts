export interface Command {
  command: number;
  modes: number[];
}

export interface ProgramResults {
  commands: number[];
  output: number[];
}

const commandArguments = {
  1: 3,
  2: 3,
  3: 1,
  4: 1,
  99: 0
};

export function runProgram(commands: number[], input?: number[]): ProgramResults {
  const output: number[] = [];
  let command = 0;
  let pointer = 0;
  let inputPointer = 0;
  while (true) {
    command = commands[pointer++];
    if (command === 99) {
      break;
    }
    const args: number[] = [];
    for (let i = 0; i < commandArguments[command]; i++) {
      args.push(commands[pointer++]);
    }

    switch (command) {
      case 1:
        commands[args[2]] = commands[args[0]] + commands[args[1]];
        break;
      case 2:
        commands[args[2]] = commands[args[0]] * commands[args[1]];
        break;
      case 3:
        commands[args[0]] = input[inputPointer++];
        break;
      case 4:
        output.push(commands[args[0]]);
        break;
      default:
        break;
    }
  }

  return { commands, output };
}

export function parseOpcode(code: number): Command {
  const codeStr = code.toString();
  const command: number = +codeStr.substr(-2);
  const modes: number[] = [];
  // It seems like there should be an easier way to remove the last two digits
  const definedModes: number[] = codeStr.split('').map(x => +x);
  definedModes.pop();
  definedModes.pop();
  for (let i = 0; i < commandArguments[command]; i++) {
    modes.push(definedModes.pop() || 0);
  }

  return {
    command,
    modes
  };
}
