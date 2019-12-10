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

export class IntCode {
  private originalCommands: number[];
  private commands: number[];
  private pointer: number;
  private inputPointer: number;
  private relativeBase: number;

  constructor(commands: number[]) {
    this.originalCommands = commands;
  }

  public runProgram(input?: number[]): ProgramResults {
    this.commands = this.originalCommands.slice();
    const output: number[] = [];
    let command: Command;
    this.pointer = 0;
    this.inputPointer = 0;
    this.relativeBase = 0;
    while (true) {
      command = parseOpcode(this.commands[this.pointer++]);

      if (command.command === OpCode.Halt) {
        break;
      }
      const args: number[] = [];
      for (let i = 0; i < commandArguments[command.command]; i++) {
        args.push(this.commands[this.pointer++]);
      }

      switch (command.command) {
        case OpCode.Add: {
          const firstOperand = this.getValueFromMode(command.modes[0], args[0]);
          const secondOperand = this.getValueFromMode(command.modes[1], args[1]);
          const writePosition = this.getWritePosition(command.modes[2], args[2]);
          this.commands[writePosition] = firstOperand + secondOperand;
          break;
        }
        case OpCode.Multiply: {
          const firstOperand = this.getValueFromMode(command.modes[0], args[0]);
          const secondOperand = this.getValueFromMode(command.modes[1], args[1]);
          const writePosition = this.getWritePosition(command.modes[2], args[2]);
          this.commands[writePosition] = firstOperand * secondOperand;
          break;
        }
        case 3: {
          const writePosition = this.getWritePosition(command.modes[0], args[0]);
          this.commands[writePosition] = input[this.inputPointer++];
          break;
        }
        case OpCode.Output: {
          const value = this.getValueFromMode(command.modes[0], args[0]);
          output.push(value);
          break;
        }
        case OpCode.JumpIfTrue: {
          const firstParam = this.getValueFromMode(command.modes[0], args[0]);
          const secondParam = this.getValueFromMode(command.modes[1], args[1]);
          if (firstParam !== 0) {
            this.pointer = secondParam;
          }
          break;
        }
        case OpCode.JumpIfFalse: {
          const firstParam = this.getValueFromMode(command.modes[0], args[0]);
          const secondParam = this.getValueFromMode(command.modes[1], args[1]);
          if (firstParam === 0) {
            this.pointer = secondParam;
          }
          break;
        }
        case OpCode.LessThan: {
          const firstParam = this.getValueFromMode(command.modes[0], args[0]);
          const secondParam = this.getValueFromMode(command.modes[1], args[1]);
          const writePosition = this.getWritePosition(command.modes[2], args[2]);
          this.commands[writePosition] = firstParam < secondParam ? 1 : 0;
          break;
        }
        case OpCode.Equals: {
          const firstParam = this.getValueFromMode(command.modes[0], args[0]);
          const secondParam = this.getValueFromMode(command.modes[1], args[1]);
          const writePosition = this.getWritePosition(command.modes[2], args[2]);
          this.commands[writePosition] = firstParam === secondParam ? 1 : 0;
          break;
        }
        case OpCode.ChangeRelativeBase: {
          const alterBaseBy = this.getValueFromMode(command.modes[0], args[0]);
          this.relativeBase += alterBaseBy;
        }
        default:
          break;
      }
    }

    return { commands: this.commands, output };
  }

  private getValueFromMode(mode: number, arg: number) {
    if (mode === Modes.Position) {
      return this.commands[arg] || 0;
    }
    if (mode === Modes.Immediate) {
      return arg;
    }
    if (mode === Modes.Relative) {
      return this.commands[this.relativeBase + arg] || 0;
    }
  }

  private getWritePosition(mode: number, arg: number) {
    if (mode === Modes.Position) {
      return arg;
    }

    if (mode === Modes.Relative) {
      return arg + this.relativeBase;
    }
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
