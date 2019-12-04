import { calculateFuelCost, calculateRecursiveFuelCost } from './fuel';

describe('fuel', () => {
  describe('calculateFuelCost', () => {
    it('returns correct results based on examples', () => {
      expect(calculateFuelCost(1969)).toEqual(654);
      expect(calculateFuelCost(100756)).toEqual(33583);
    });
  });

  describe('calculateRecursiveFuelCost', () => {
    it('returns correct results based on examples', () => {
      expect(calculateRecursiveFuelCost(14)).toEqual(2);
      expect(calculateRecursiveFuelCost(1969)).toEqual(966);
      expect(calculateRecursiveFuelCost(100756)).toEqual(50346);
    });
  });
});
