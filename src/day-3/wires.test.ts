import { Grid } from "./wires";

describe("wires", () => {
  describe("Grid", () => {
    describe("unit", () => {
      describe("addWire", () => {
        it("adds a single direction wire correctly", () => {
          const grid = new Grid();
          grid.addWire("R75");
          expect(grid.wireGrid[75][0]).toEqual(new Set([1]));
        });
        it("adds the sample wire correctly", () => {
          const grid = new Grid();
          grid.addWire("R75,D30,R83,U83,L12,D49,R71,U7,L72");
          expect(grid.wireGrid[75][0]).toEqual(new Set([1]));
          expect(grid.wireGrid[75]["-24"]).toEqual(new Set([1]));
          expect(grid.wireGrid[125]["-30"]).toEqual(new Set([1]));
        });
        it("does not add an addition entry for self-intersecting wires", () => {
          const grid = new Grid();
          grid.addWire("R10,U10,L5,D20");
          expect(grid.wireGrid[5][0]).toEqual(new Set([1]));
        });
        it("does add a new entry for another intersecting wire", () => {
          const grid = new Grid();
          grid.addWire("R10,U10,L5,D20");
          grid.addWire("U20,R7,D11");
          expect(grid.wireGrid[7][10]).toEqual(new Set([1, 2]));
        });
      });
      describe("findIntersections", () => {
        it("finds intersection", () => {
          const grid = new Grid();
          grid.addWire("U10,R5,D10");
          grid.addWire("R2,U4,R7");
          expect(grid.findIntersections()).toEqual([{ x: 5, y: 4 }]);
        });
      });
    });

    describe("functional", () => {
      it("expected results with given example data - 1", () => {
        const grid = new Grid();
        grid.addWire("R75,D30,R83,U83,L12,D49,R71,U7,L72");
        grid.addWire("U62,R66,U55,R34,D71,R55,D58,R83");
        expect(grid.getSmallestDistance()).toEqual(159);
      });
      it("expected results with given example data - 2", () => {
        const grid = new Grid();
        grid.addWire("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51");
        grid.addWire("U98,R91,D20,R16,D67,R40,U7,R15,U6,R7");
        expect(grid.getSmallestDistance()).toEqual(135);
      });
    });
  });
});
