export interface Dimensions {
  height: number;
  width: number;
}

export default class Grid<T> {
  private gridArrays: T[][] = [];

  constructor() {
    return;
  }

  public fill(value: T, dimensions: Dimensions): void {
    this.gridArrays = [];
    for (let y = 0; y < dimensions.height; y++) {
      this.gridArrays[y] = [];
      for (let x = 0; x < dimensions.width; x++) {
        this.gridArrays[y][x] = value;
      }
    }
  }

  public getValue(x, y): T {
    return this.gridArrays[y][x];
  }

  public toString(): string {
    const height = this.gridArrays.length;
    const width = this.gridArrays[0].length;
    let gridStr = '';
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        gridStr += this.getValue(x, y);
      }
      gridStr += '\n';
    }
    return gridStr;
  }
}
