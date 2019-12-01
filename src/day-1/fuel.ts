export function calculateFuelCost(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

export function calculateRecursiveFuelCost(mass: number): number {
  let total = 0;
  let addedMass = mass;
  do {
    addedMass = calculateFuelCost(addedMass);
    total += addedMass;
  } while (calculateFuelCost(addedMass) > 0);
  return total;
}
