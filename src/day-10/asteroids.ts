import Grid, { Coordinate } from './grid';

export class AsteroidMap {
  private grid: Grid<string>;

  constructor(mapString: string) {
    this.grid = new Grid<string>();
    const rows = mapString.split('\n');
    rows.forEach((row, y) => {
      const columns = row.split('');
      columns.forEach((value, x) => {
        this.grid.setValue({ x, y }, value);
      });
    });
  }

  public getCoordinate(x: number, y: number): string {
    return this.grid.getValue({ x, y });
  }

  public findBestStation(): Coordinate {
    return { x: 0, y: 0 };
  }
}
