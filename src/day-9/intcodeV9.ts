export interface Command {
  command: number;
  modes: number[];
}

export interface ProgramResults {
  commands: number[];
  output: number[];
}

enum Modes {
  Position = 0,
  Immediate = 1,
  Relative = 2
}

enum OpCode {
  Add = 1,
  Multiply = 2,
  Input = 3,
  Output = 4,
  JumpIfTrue = 5,
  JumpIfFalse = 6,
  LessThan = 7,
  Equals = 8,
  ChangeRelativeBase = 9,
  Halt = 99
}

const commandArguments = {
  [OpCode.Add]: 3,
  [OpCode.Multiply]: 3,
  [OpCode.Input]: 1,
  [OpCode.Output]: 1,
  [OpCode.JumpIfTrue]: 2,
  [OpCode.JumpIfFalse]: 2,
  [OpCode.LessThan]: 3,
  [OpCode.Equals]: 3,
  [OpCode.ChangeRelativeBase]: 1,
  [OpCode.Halt]: 0
};

export function runProgram(originalCommands: number[], input?: number[]): ProgramResults {
  const commands = originalCommands.slice();
  const output: number[] = [];
  let command: Command;
  let pointer = 0;
  let inputPointer = 0;
  let relativeBase = 0;
  while (true) {
    command = parseOpcode(commands[pointer++]);

    if (command.command === OpCode.Halt) {
      break;
    }
    const args: number[] = [];
    for (let i = 0; i < commandArguments[command.command]; i++) {
      args.push(commands[pointer++]);
    }

    switch (command.command) {
      case OpCode.Add: {
        const firstOperand = getValueFromMode(command.modes[0], args[0], commands, relativeBase);
        const secondOperand = getValueFromMode(command.modes[1], args[1], commands, relativeBase);
        const writePosition = getWritePosition(command.modes[2], args[2], relativeBase);
        commands[writePosition] = firstOperand + secondOperand;
        break;
      }
      case OpCode.Multiply: {
        const firstOperand = getValueFromMode(command.modes[0], args[0], commands, relativeBase);
        const secondOperand = getValueFromMode(command.modes[1], args[1], commands, relativeBase);
        const writePosition = getWritePosition(command.modes[2], args[2], relativeBase);
        commands[writePosition] = firstOperand * secondOperand;
        break;
      }
      case 3: {
        const writePosition = getWritePosition(command.modes[0], args[0], relativeBase);
        commands[writePosition] = input[inputPointer++];
        break;
      }
      case OpCode.Output: {
        const value = getValueFromMode(command.modes[0], args[0], commands, relativeBase);
        output.push(value);
        break;
      }
      case OpCode.JumpIfTrue: {
        const firstParam = getValueFromMode(command.modes[0], args[0], commands, relativeBase);
        const secondParam = getValueFromMode(command.modes[1], args[1], commands, relativeBase);
        if (firstParam !== 0) {
          pointer = secondParam;
        }
        break;
      }
      case OpCode.JumpIfFalse: {
        const firstParam = getValueFromMode(command.modes[0], args[0], commands, relativeBase);
        const secondParam = getValueFromMode(command.modes[1], args[1], commands, relativeBase);
        if (firstParam === 0) {
          pointer = secondParam;
        }
        break;
      }
      case OpCode.LessThan: {
        const firstParam = getValueFromMode(command.modes[0], args[0], commands, relativeBase);
        const secondParam = getValueFromMode(command.modes[1], args[1], commands, relativeBase);
        const writePosition = getWritePosition(command.modes[2], args[2], relativeBase);
        commands[writePosition] = firstParam < secondParam ? 1 : 0;
        break;
      }
      case OpCode.Equals: {
        const firstParam = getValueFromMode(command.modes[0], args[0], commands, relativeBase);
        const secondParam = getValueFromMode(command.modes[1], args[1], commands, relativeBase);
        const writePosition = getWritePosition(command.modes[2], args[2], relativeBase);
        commands[writePosition] = firstParam === secondParam ? 1 : 0;
        break;
      }
      case OpCode.ChangeRelativeBase: {
        const alterBaseBy = getValueFromMode(command.modes[0], args[0], commands, relativeBase);
        relativeBase += alterBaseBy;
      }
      default:
        break;
    }
  }

  return { commands, output };
}

function getValueFromMode(mode: number, arg: number, commands: number[], relativeBase: number) {
  if (mode === Modes.Position) {
    return commands[arg] || 0;
  }
  if (mode === Modes.Immediate) {
    return arg;
  }
  if (mode === Modes.Relative) {
    return commands[relativeBase + arg] || 0;
  }
}

function getWritePosition(mode: number, arg: number, relativeBase: number) {
  if (mode === Modes.Position) {
    return arg;
  }

  if (mode === Modes.Relative) {
    return arg + relativeBase;
  }
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
