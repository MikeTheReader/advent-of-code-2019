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
      pOneModifier = pOneGreater ? 1 : -1;
      pTwoModifier = pOneGreater ? -1 : 1;
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
  return null;
}
