export class AsteroidMap {
  private grid: string[][];

  constructor(mapString: string) {
    this.grid = [];
    const rows = mapString.split('\n');
    rows.forEach((row, y) => {
      this.grid[y] = [];
      const columns = row.split('');
      columns.forEach((column, x) => {
        this.grid[y][x] = column;
      });
    });
  }

  public getCoordinate(x: number, y: number): string {
    return this.grid[y][x];
  }
}
