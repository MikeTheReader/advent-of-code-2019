export interface Dimensions {
  height: number;
  width: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export default class Grid<T> {
  public static fromGrid(grid: Grid<any>): Grid<any> {
    const newGrid = new Grid();
    grid.processCells(coord => {
      newGrid.setValue(coord, grid.getValue(coord));
    });
    return newGrid;
  }

  private gridArrays: T[][] = [];

  public fill(value: T, dimensions: Dimensions): void {
    this.gridArrays = [];
    for (let y = 0; y < dimensions.height; y++) {
      this.gridArrays[y] = [];
      for (let x = 0; x < dimensions.width; x++) {
        this.gridArrays[y][x] = value;
      }
    }
  }

  public getValue({ x, y }: Coordinate): T {
    if (!this.gridArrays[y]) {
      return null;
    }
    return this.gridArrays[y][x];
  }

  public setValue({ x, y }: Coordinate, value: T) {
    if (!this.gridArrays[y]) {
      this.gridArrays[y] = [] as T[];
    }
    this.gridArrays[y][x] = value;
  }

  public findInGrid(value: T): Coordinate[] {
    const matches: Coordinate[] = [];
    this.processCells(coord => {
      if (this.getValue(coord) === value) {
        matches.push(coord);
      }
    });
    return matches;
  }

  public processCells(callback: (coord: Coordinate, index: number) => void) {
    const height = this.gridArrays.length;
    const width = this.gridArrays[0].length;
    let index = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        callback({ x, y }, index++);
      }
    }
  }

  public processCellsInRadar(center: Coordinate, callback: (coord: Coordinate, index: number) => void) {
    const height = this.gridArrays.length;
    const width = this.gridArrays[0].length;

    const slope = { x: 0, y: -1 };
    let x = center.x;
    let y = center.y;
    let xIncrementer = 0;
    let yIncrementer = -1;

    for (let i = 0; i < height * width - 1; i++) {
      x = Math.min(Math.max(0, x + slope.x), width);
      y = Math.min(Math.max(0, y + slope.y), height);
      callback({ x, y }, i);

      if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
        if (x === 0 || x === width - 1) {
          yIncrementer = xIncrementer;
          xIncrementer = 0;
        }
        if (y === 0 || y === height - 1) {
          xIncrementer = yIncrementer * -1;
          yIncrementer = 0;
        }
        x = center.x;
        y = center.y;
        slope.x += xIncrementer;
        slope.y += yIncrementer;
      }
      x += slope.x;
      y += slope.y;
    }
  }

  public processSpiral(center: Coordinate, callback: (coord: Coordinate, index: number) => void) {
    let radius = 1;
    let index = 0;
    const height = this.gridArrays.length;
    const width = this.gridArrays[0].length;
    while (
      center.x - radius > -1 ||
      radius + center.x < width ||
      center.y - radius > -1 ||
      radius + center.y < height
    ) {
      const ranges = this.getRangeForBoxAround(center, radius);
      let y = ranges.yRange.min;
      let x = ranges.xRange.min;

      // left
      for (; x < ranges.xRange.max; x++) {
        if (!(x === center.x && y === center.y)) {
          callback({ x, y }, index++);
        }
      }

      // down
      for (; y < ranges.yRange.max; y++) {
        if (!(x === center.x && y === center.y)) {
          callback({ x, y }, index++);
        }
      }

      // up
      for (; x > ranges.xRange.min; x--) {
        if (!(x === center.x && y === center.y)) {
          callback({ x, y }, index++);
        }
      }

      // right
      for (; y > ranges.yRange.min; y--) {
        if (!(x === center.x && y === center.y)) {
          callback({ x, y }, index++);
        }
      }

      radius++;
    }
  }

  public toString(): string {
    const width = this.gridArrays[0].length;
    let gridStr = '';
    this.processCells((coord, index) => {
      gridStr += this.getValue(coord) + ' ';
      if ((index + 1) % width === 0) {
        gridStr += '\n';
      }
    });
    return gridStr;
  }

  private getRangeForBoxAround(center: Coordinate, radius: number) {
    const height = this.gridArrays.length;
    const width = this.gridArrays[0].length;
    const xRange = { max: Math.min(center.x + radius, width - 1), min: Math.max(center.x - radius, 0) };
    const yRange = { max: Math.min(center.y + radius, height - 1), min: Math.max(center.y - radius, 0) };
    return { xRange, yRange };
  }
}
