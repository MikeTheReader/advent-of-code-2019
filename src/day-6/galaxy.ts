export interface Planet {
  name: string;
  orbiters: Planet[];
  orbits: Planet;
}

export class Galaxy {
  constructor() {
    // to implement
  }

  public getRoot(): Planet {
    return null;
  }

  public addOrbit(planetStr: string): void {
    // to implement
  }
}
