export enum Color {
  Black = 0,
  White = 1
}

export enum Turn {
  Left = 0,
  Right = 1
}

export class Robot {
  public paint(processor: (currentColor: number) => number[]): void {
    // nothing
  }

  public getPaintedPanels(): number {
    return 0;
  }
}
