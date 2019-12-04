export interface Coordinate {
  x: number;
  y: number;
  steps: number;
}

export interface Rows {
  [key: string]: WireStep[];
}
export interface Columns {
  [key: string]: Rows;
}

export interface WireStep {
  wire: number;
  step: number;
}

const DIRECTION_MAP = {
  U: [0, 1],
  D: [0, -1],
  R: [1, 0],
  L: [-1, 0]
};

export class Grid {
  public wireGrid: Columns = {};
  private wireNumber = 0;

  public addWire(wire: string): void {
    this.wireNumber++;
    const steps = wire.split(",");
    let currentX = 0;
    let currentY = 0;
    let stepCount = 1;
    steps.forEach(step => {
      const direction = step.substr(0, 1);
      const distance = +step.substring(1);
      const increment = DIRECTION_MAP[direction];

      for (let i = 0; i < Math.abs(distance); i++) {
        currentX += increment[0];
        currentY += increment[1];
        const currentGridLoc = this.getLocation(currentX, currentY);

        if (!currentGridLoc.find(entry => entry.wire === this.wireNumber)) {
          currentGridLoc.push({
            wire: this.wireNumber,
            step: stepCount
          });
        }
        stepCount++;
      }
    });
  }

  public findIntersections(): Coordinate[] {
    const intersections = [];
    Object.entries(this.wireGrid).forEach(([xLocation, column]) => {
      Object.entries(column).forEach(([yLocation, value]) => {
        if (value.length > 1) {
          const sumSteps = value.map(w => w.step).reduce((a, b) => a + b);
          intersections.push({ x: +xLocation, y: +yLocation, steps: sumSteps });
        }
      });
    });
    return intersections;
  }

  public getSmallestDistance(): number {
    let smallestDistance = Infinity;
    this.findIntersections().forEach(coord => {
      const manhattanDistance = Math.abs(coord.x - 0) + Math.abs(coord.y - 0);
      smallestDistance = Math.min(manhattanDistance, smallestDistance);
    });
    return smallestDistance;
  }

  public getLeastSteps(): number {
    let leastSteps = Infinity;
    this.findIntersections().forEach(coord => {
      leastSteps = Math.min(coord.steps, leastSteps);
    });
    return leastSteps;
  }

  private getLocation(currentX: number, currentY: number) {
    if (!this.wireGrid[currentX]) {
      this.wireGrid[currentX] = {};
    }
    if (!this.wireGrid[currentX][currentY]) {
      this.wireGrid[currentX][currentY] = [];
    }
    return this.wireGrid[currentX][currentY];
  }
}
