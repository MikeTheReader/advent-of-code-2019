import { IntCode } from '../day-11/intcodeV11';

enum MovementCommand {
  North = 1,
  South = 2,
  West = 3,
  East = 4
}

enum StatusCodes {
  HitAWall = 0,
  MovedOneStep = 1,
  FoundOxygenSystem = 2
}

const oppositeDirection = {
  [MovementCommand.North]: MovementCommand.South,
  [MovementCommand.West]: MovementCommand.East,
  [MovementCommand.South]: MovementCommand.North,
  [MovementCommand.East]: MovementCommand.West
};

export function findOxygenSteps(processor: IntCode): number {
  const smallest = recursiveFind([], MovementCommand.North, processor);
  return smallest;
}

function recursiveFind(previousCommands, currentDirection, processor) {
  const allExits: MovementCommand[] = findAllExits(previousCommands, processor);
  const viableExits = allExits.filter(direction => direction !== oppositeDirection[currentDirection]);
  if (!viableExits.length) {
    return Infinity; // Dead end
  }
  let foundIt = false;
  viableExits.forEach(direction => {
    const newCommands = previousCommands.slice();
    newCommands.push(direction);
    const directionResult = processor.runProgram(newCommands).output[newCommands.length - 1];
    if (directionResult === StatusCodes.FoundOxygenSystem) {
      foundIt = true;
    }
  });
  if (foundIt) {
    return previousCommands.length + 1;
  }
  const numStepsToGoal = viableExits.map(direction => {
    const newCommands = previousCommands.slice();
    newCommands.push(direction);
    return recursiveFind(newCommands, direction, processor);
  });

  const positiveSteps = numStepsToGoal.filter(steps => steps > -1);
  return Math.min(...positiveSteps);
}

function findAllExits(previousCommands, processor): MovementCommand[] {
  const exits = [];
  [MovementCommand.North, MovementCommand.South, MovementCommand.East, MovementCommand.West].forEach(command => {
    const newCommands = previousCommands.slice();
    newCommands.push(command);
    const directionResult = processor.runProgram(newCommands).output[newCommands.length - 1];
    if (directionResult !== StatusCodes.HitAWall) {
      exits.push(command);
    }
  });
  return exits;
}
