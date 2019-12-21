import Grid, { Dimensions } from '../utils/grid';

export enum Color {
  Black = 0,
  White = 1
}

export enum Turn {
  Left = 0,
  Right = 1
}

export enum Direction {
  Up = 0,
  Right = 1,
  Down = 2,
  Left = 3
}

export class Robot {
  private grid: Grid<string>;
  private currentCoordinate = { x: 2, y: 2 };
  private currentDirection = Direction.Up;
  private paintedPanels;

  constructor(initialColor: Color = Color.Black, size: Dimensions = { height: 10, width: 50 }) {
    this.grid = new Grid();
    this.grid.fill('.', size);
    this.grid.setValue(this.currentCoordinate, initialColor === Color.Black ? '.' : '#');
  }

  public paint(processor: (currentColor: number) => number[]): void {
    this.paintedPanels = new Set();
    do {
      const currentColor = this.grid.getValue(this.currentCoordinate) === '.' ? Color.Black : Color.White;
      const returnValue = processor(currentColor);
      const [color, turnDir] = returnValue;
      if (color === undefined) {
        break;
      }
      this.paintedPanels.add(JSON.stringify(this.currentCoordinate));
      this.grid.setValue(this.currentCoordinate, color === Color.Black ? '.' : '#');
      this.turn(turnDir);
    } while (true);
  }

  public getPaintedPanels(): number {
    return this.paintedPanels.size;
  }

  public toString(): string {
    return this.grid.toString();
  }

  private turn(turnDir: Turn): void {
    const modifier = turnDir === Turn.Right ? 1 : -1;
    let newDir = this.currentDirection + modifier;
    if (newDir > 3) {
      newDir = 0;
    }
    if (newDir < 0) {
      newDir = 3;
    }
    this.currentDirection = newDir;
    switch (this.currentDirection) {
      case Direction.Up: {
        this.currentCoordinate.y--;
        break;
      }
      case Direction.Down: {
        this.currentCoordinate.y++;
        break;
      }
      case Direction.Left: {
        this.currentCoordinate.x--;
        break;
      }
      case Direction.Right: {
        this.currentCoordinate.x++;
        break;
      }
    }
  }
}
