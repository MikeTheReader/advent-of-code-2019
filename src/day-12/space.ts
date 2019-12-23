export interface Planet {
  position: {
    x: number;
    y: number;
    z: number;
  };
  velocity: {
    x: number;
    y: number;
    z: number;
  };
}

const axes = ['x', 'y', 'z'];

export function applyGravity(pOne: Planet, pTwo: Planet): void {
  axes.forEach(axis => {
    let pOneModifier = 0;
    let pTwoModifier = 0;
    if (pOne.position[axis] !== pTwo.position[axis]) {
      const pOneGreater = pOne.position[axis] > pTwo.position[axis];
      pOneModifier = pOneGreater ? -1 : 1;
      pTwoModifier = pOneGreater ? 1 : -1;
    }
    pOne.velocity[axis] += pOneModifier;
    pTwo.velocity[axis] += pTwoModifier;
  });
}

export function applyVelocity(planet: Planet): void {
  axes.forEach(axis => {
    planet.position[axis] = planet.position[axis] + planet.velocity[axis];
  });
}

export function parsePlanet(planetStr: string): Planet {
  const regex = /^<x=(-?\d*), y=(-?\d*), z=(-?\d*)>/;
  const matches = planetStr.match(regex);
  const x = +matches[1];
  const y = +matches[2];
  const z = +matches[3];
  return {
    position: { x, y, z },
    velocity: { x: 0, y: 0, z: 0 }
  };
}

export function tick(planets: Planet[]): void {
  for (let i = 0; i < planets.length; i++) {
    const currentPlanet = planets[i];
    for (let t = i + 1; t < planets.length; t++) {
      applyGravity(currentPlanet, planets[t]);
    }
  }
  planets.forEach(applyVelocity);
}

export function calculateEnergy({ position, velocity }: Planet): number {
  const potentialEnergy = Math.abs(position.x) + Math.abs(position.y) + Math.abs(position.z);
  const kineticEnergy = Math.abs(velocity.x) + Math.abs(velocity.y) + Math.abs(velocity.z);
  return potentialEnergy * kineticEnergy;
}

export function findPeriod(planets: Planet[]): number {
  const xInitialState = getCurrentState(planets, 'x');
  const yInitialState = getCurrentState(planets, 'y');
  const zInitialState = getCurrentState(planets, 'z');
  let xPeriod = 0;
  let yPeriod = 0;
  let zPeriod = 0;
  let i = 0;
  while (true) {
    tick(planets);
    i++;
    if (!xPeriod && getCurrentState(planets, 'x') === xInitialState) {
      xPeriod = i;
    }
    if (!yPeriod && getCurrentState(planets, 'y') === yInitialState) {
      yPeriod = i;
    }
    if (!zPeriod && getCurrentState(planets, 'z') === zInitialState) {
      zPeriod = i;
    }
    if (xPeriod && yPeriod && zPeriod) {
      break;
    }
  }

  return lcm([xPeriod, yPeriod, zPeriod]);
}

function getCurrentState(planets: Planet[], axis: string): string {
  return planets.reduce((str, planet) => {
    return str + JSON.stringify(planet.position[axis]) + JSON.stringify(planet.velocity[axis]);
  }, '');
}

function gcd(a: number, b: number): number {
  if (!b) {
    return b === 0 ? a : NaN;
  }
  return gcd(b, a % b);
}

function lcm2(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function lcm(array: number[]): number {
  let n = 1;
  array.forEach(i => {
    n = lcm2(i, n);
  });
  return n;
}
