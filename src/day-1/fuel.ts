export function calculateFuelCost(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

export function calculateRecursiveFuelCost(mass: number): number {
  return 0;
}
