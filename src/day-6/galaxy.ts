export interface Planet {
  name: string;
  orbiters: Planet[];
  orbits: Planet;
}

export class Galaxy {
  private planets = {};

  constructor() {
    // to implement
  }

  public getRoot(): Planet {
    // tslint:disable-next-line: no-string-literal
    return this.planets['COM'];
  }

  public addOrbit(planetStr: string): void {
    const orbitRegex = /(.*)\)(.*)/;
    const matches = planetStr.match(orbitRegex);
    const name = matches[1];
    const orbiter = matches[2];
    this.planets[name] = this.planets[name] || { name, orbiters: [], orbits: [] };
    this.planets[orbiter] = this.planets[orbiter] || { name: orbiter, orbiters: [], orbits: [] };
    this.planets[name].orbiters.push(this.planets[orbiter]);
    this.planets[orbiter].orbits.push(this.planets[name]);
  }
}
