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
    return this.gridArrays[y][x];
  }

  public setValue({ x, y }: Coordinate, value: T) {
    if (!this.gridArrays[y]) {
      this.gridArrays[y] = [] as T[];
    }
    this.gridArrays[y][x] = value;
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

  public processSpiral(center: Coordinate, callback: (coord: Coordinate, index: number) => void) {
    let radius = 1;
    let index = 0;
    const height = this.gridArrays.length;
    const width = this.gridArrays[0].length;
    while (radius + center.x < width || radius + center.y < height) {
      const ranges = this.getRangeForBoxAround(center, radius);
      let y = ranges.yRange.min;
      let x = ranges.xRange.min;

      // left
      for (; x < ranges.xRange.max; x++) {
        callback({ x, y }, index++);
      }

      // down
      for (; y < ranges.yRange.max; y++) {
        callback({ x, y }, index++);
      }

      // up
      for (; x > ranges.xRange.min; x--) {
        callback({ x, y }, index++);
      }

      // right
      for (; y > ranges.yRange.min; y--) {
        callback({ x, y }, index++);
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
