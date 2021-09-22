import { IntCode } from '../day-11/intcodeV11';
import Grid, { Coordinate } from '../utils/grid';

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

const toTheRight = {
  [MovementCommand.North]: MovementCommand.East,
  [MovementCommand.East]: MovementCommand.South,
  [MovementCommand.South]: MovementCommand.West,
  [MovementCommand.West]: MovementCommand.North
};

const toTheLeft = {
  [MovementCommand.North]: MovementCommand.West,
  [MovementCommand.West]: MovementCommand.South,
  [MovementCommand.South]: MovementCommand.East,
  [MovementCommand.East]: MovementCommand.North
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

function getNewLocation(gridLocation: Coordinate, direction: MovementCommand): Coordinate {
  if (direction === MovementCommand.North) {
    return { x: gridLocation.x, y: gridLocation.y - 1 };
  } else if (direction === MovementCommand.South) {
    return { x: gridLocation.x, y: gridLocation.y + 1 };
  } else if (direction === MovementCommand.East) {
    return { x: gridLocation.x + 1, y: gridLocation.y };
  } else if (direction === MovementCommand.West) {
    return { x: gridLocation.x - 1, y: gridLocation.y };
  }
}

export function drawWholeGrid(processor: IntCode, display: boolean = true): Grid<string> {
  const gridSpan = 46;
  const grid = new Grid<string>();
  grid.fill(' ', { height: gridSpan, width: gridSpan });
  let gridLocation = { x: gridSpan / 2, y: gridSpan / 2 };
  const startingLocation = gridLocation;

  const directionsMoved: number[] = [];
  let currentDirection = MovementCommand.North;
  let iteration = 0;
  directionsMoved.push(currentDirection);
  grid.setValue(gridLocation, 'S');
  while (iteration < 5000) {
    if (iteration > 5 && gridLocation.x === startingLocation.x && gridLocation.y === startingLocation.y) {
      break;
    } else if (grid.getValue(gridLocation) !== '#') {
      if (display) {
        grid.setValue(gridLocation, '0');

        // tslint:disable
        console.clear();
        console.log(grid.toString());
        // tslint:enable
      }
      grid.setValue(gridLocation, '.');
    }
    const output = processor.runProgram(directionsMoved).output[iteration];
    if (output === StatusCodes.HitAWall) {
      grid.setValue(getNewLocation(gridLocation, currentDirection), 'X');
      currentDirection = toTheRight[currentDirection];
    } else if (output === StatusCodes.MovedOneStep) {
      gridLocation = getNewLocation(gridLocation, currentDirection);
      const previousCommands = directionsMoved.slice();
      previousCommands.push(toTheLeft[currentDirection]);
      const checkRight = processor.runProgram(directionsMoved).output[iteration + 1];
      if (checkRight !== StatusCodes.HitAWall) {
        currentDirection = toTheLeft[currentDirection];
      }
    } else if (output === StatusCodes.FoundOxygenSystem) {
      gridLocation = getNewLocation(gridLocation, currentDirection);
      grid.setValue(gridLocation, '#');
    }
    directionsMoved.push(currentDirection);
    iteration++;
  }

  return grid;
}

export function fillWithOxygen(grid: Grid<string>): number {
  const oxygenGeneratorCoordinate = grid.findInGrid('#')[0]; // There will only be one
  grid.setValue(oxygenGeneratorCoordinate, 'O');
  let seconds = 0;
  let gridIsFull = false;
  while (!gridIsFull) {
    gridIsFull = iterateOxygen(grid);
    seconds++;
  }
  return seconds;
}

function iterateOxygen(grid: Grid<string>): boolean {
  const cellsWithOxygen = grid.findInGrid('O');
  cellsWithOxygen.forEach(cell => {
    const directions = [
      { x: cell.x + 1, y: cell.y },
      { x: cell.x - 1, y: cell.y },
      { x: cell.x, y: cell.y + 1 },
      { x: cell.x, y: cell.y - 1 }
    ];
    directions.forEach(dir => {
      if (grid.getValue(dir) === '.') {
        grid.setValue(dir, 'O');
      }
    });
  });

  return grid.findInGrid('.').length === 0;
}
