export function calculateFuelCost(mass: number): number {
  return Math.floor(mass / 3) - 2;
}
