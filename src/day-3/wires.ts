export interface Coordinate {
  x: number;
  y: number;
}

const DIRECTION_MAP = {
  U: [0, 1],
  D: [0, -1],
  R: [1, 0],
  L: [-1, 0]
};

export class Grid {
  public wires = {};
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
        if (!this.wires[currentX]) {
          this.wires[currentX] = {};
        }
        if (!this.wires[currentX][currentY]) {
          this.wires[currentX][currentY] = new Set();
        }
        this.wires[currentX][currentY].add(this.wireNumber);
      }
    });
  }

  public findIntersections(): Coordinate[] {
    return [];
  }

  public getSmallestDistance(): number {
    return 0;
  }
}
