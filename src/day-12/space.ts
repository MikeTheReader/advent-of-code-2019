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

export function applyGravity(pOne: Planet, pTwo: Planet): void {
  const axes = ['x', 'y', 'z'];
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
