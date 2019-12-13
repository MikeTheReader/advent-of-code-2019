import Grid from './grid';

describe('Grid', () => {
  describe('fill', () => {
    it('Fills the grid with a default value', () => {
      const grid = new Grid<string>();
      grid.fill('.', { height: 10, width: 10 });
      expect(grid.getValue({ x: 5, y: 5 })).toBe('.');
      expect(grid.getValue({ x: 1, y: 5 })).toBe('.');
      expect(grid.getValue({ x: 5, y: 9 })).toBe('.');
    });
  });
  describe('toString', () => {
    it('returns a readable string representation of the grid', () => {
      const grid = new Grid<string>();
      grid.fill('.', { height: 5, width: 5 });
      // prettier-ignore
      expect(grid.toString()).toEqual(
        '. . . . . \n' +
        '. . . . . \n' +
        '. . . . . \n' +
        '. . . . . \n' +
        '. . . . . \n'
      );
    });
  });
  describe('processCells', () => {
    it('processes all cells correctly', () => {
      const grid = new Grid<number>();
      grid.fill(-1, { height: 5, width: 5 });
      grid.processCells((coord, index) => {
        grid.setValue(coord, index);
      });
      // prettier-ignore
      expect(grid.toString()).toEqual(
        '0 1 2 3 4 \n' +
        '5 6 7 8 9 \n' +
        '10 11 12 13 14 \n' +
        '15 16 17 18 19 \n' +
        '20 21 22 23 24 \n'
      );
    });
  });
  describe('processSprial', () => {
    it('processes all cells in a spiral pattern', () => {
      const grid = new Grid<number>();
      grid.fill(-1, { height: 5, width: 5 });
      grid.processSpiral({ x: 2, y: 2 }, (coord, index) => {
        grid.setValue(coord, index);
      });
      // prettier-ignore
      expect(grid.toString()).toEqual(
        '8 9 10 11 12 \n' +
        '23 0 1 2 13 \n' +
        '22 7 -1 3 14 \n' +
        '21 6 5 4 15 \n' +
        '20 19 18 17 16 \n'
      );
    });
  });
  describe('fromGrid', () => {
    it('copies an existing grid', () => {
      const grid = new Grid<string>();
      grid.fill('.', { height: 5, width: 5 });
      const gridCopy = Grid.fromGrid(grid);
      gridCopy.setValue({ x: 2, y: 2 }, '*');

      // prettier-ignore
      expect(grid.toString()).toEqual(
        '. . . . . \n' +
        '. . . . . \n' +
        '. . . . . \n' +
        '. . . . . \n' +
        '. . . . . \n'
      );

      // prettier-ignore
      expect(gridCopy.toString()).toEqual(
        '. . . . . \n' +
        '. . . . . \n' +
        '. . * . . \n' +
        '. . . . . \n' +
        '. . . . . \n'
      );
    });
  });
});