export interface Coordinate {
  x: number;
  y: number;
}

export interface Column {
  [key: string]: Set<number>;
}
export interface Rows {
  [key: string]: Column;
}

const DIRECTION_MAP = {
  U: [0, 1],
  D: [0, -1],
  R: [1, 0],
  L: [-1, 0]
};

export class Grid {
  public wireGrid: Rows = {};
  private wireNumber = 0;

  public addWire(wire: string): void {
    this.wireNumber++;
    const steps = wire.split(",");
    let currentX = 0;
    let currentY = 0;
    steps.forEach(step => {
      const direction = step.substr(0, 1);
      const distance = +step.substring(1);
      const increment = DIRECTION_MAP[direction];

      for (let i = 0; i < Math.abs(distance); i++) {
        currentX += increment[0];
        currentY += increment[1];
        if (!this.wireGrid[currentX]) {
          this.wireGrid[currentX] = {};
        }
        if (!this.wireGrid[currentX][currentY]) {
          this.wireGrid[currentX][currentY] = new Set();
        }
        this.wireGrid[currentX][currentY].add(this.wireNumber);
      }
    });
  }

  public findIntersections(): Coordinate[] {
    const intersections = [];
    Object.entries(this.wireGrid).forEach(([xLocation, column]) => {
      Object.entries(column).forEach(([yLocation, xValue]) => {
        if (xValue.size > 1) {
          intersections.push({ x: +xLocation, y: +yLocation });
        }
      });
    });
    return intersections;
  }

  public getSmallestDistance(): number {
    return 0;
  }
}
