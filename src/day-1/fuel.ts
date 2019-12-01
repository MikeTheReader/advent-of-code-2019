export function calculateFuelCost(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

export function calculateRecursiveFuelCost(mass: number): number {
  let total = 0;
  let addedMass = mass;
  addedMass = calculateFuelCost(addedMass);
  while (addedMass > 0) {
    total += addedMass;
    addedMass = calculateFuelCost(addedMass);
  }
  return total;
}
