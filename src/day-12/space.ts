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
