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
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  99: 0
};

export function runProgram(commands: number[], input?: number[]): ProgramResults {
  const output: number[] = [];
  let command: Command;
  let pointer = 0;
  let inputPointer = 0;
  while (true) {
    command = parseOpcode(commands[pointer++]);

    if (command.command === 99) {
      break;
    }
    const args: number[] = [];
    for (let i = 0; i < commandArguments[command.command]; i++) {
      args.push(commands[pointer++]);
    }

    switch (command.command) {
      case 1: {
        const firstOperand = command.modes[0] ? args[0] : commands[args[0]];
        const secondOperand = command.modes[1] ? args[1] : commands[args[1]];
        commands[args[2]] = firstOperand + secondOperand;
        break;
      }
      case 2: {
        const firstOperand = command.modes[0] ? args[0] : commands[args[0]];
        const secondOperand = command.modes[1] ? args[1] : commands[args[1]];
        commands[args[2]] = firstOperand * secondOperand;
        break;
      }
      case 3: {
        commands[args[0]] = input[inputPointer++];
        break;
      }
      case 4: {
        const value = command.modes[0] ? args[0] : commands[args[0]];
        output.push(value);
        break;
      }
      case 5: {
        const firstParam = command.modes[0] ? args[0] : commands[args[0]];
        const secondParam = command.modes[1] ? args[1] : commands[args[1]];
        if (firstParam !== 0) {
          pointer = secondParam;
        }
        break;
      }
      case 6: {
        const firstParam = command.modes[0] ? args[0] : commands[args[0]];
        const secondParam = command.modes[1] ? args[1] : commands[args[1]];
        if (firstParam === 0) {
          pointer = secondParam;
        }
        break;
      }
      case 7: {
        const firstParam = command.modes[0] ? args[0] : commands[args[0]];
        const secondParam = command.modes[1] ? args[1] : commands[args[1]];
        commands[args[2]] = firstParam < secondParam ? 1 : 0;
        break;
      }
      case 8: {
        const firstParam = command.modes[0] ? args[0] : commands[args[0]];
        const secondParam = command.modes[1] ? args[1] : commands[args[1]];
        commands[args[2]] = firstParam === secondParam ? 1 : 0;
        break;
      }
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
