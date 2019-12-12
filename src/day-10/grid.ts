export interface Dimensions {
  height: number;
  width: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export default class Grid<T> {
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
}
