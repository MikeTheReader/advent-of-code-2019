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
  // to come
}
