import { calculateFuelCost } from "./fuel";

describe("fuel", () => {
  describe("calculateFuelCost", () => {
    it("returns correct results based on examples", () => {
      expect(calculateFuelCost(1969)).toEqual(654);
      expect(calculateFuelCost(100756)).toEqual(33583);
    });
  });
});
