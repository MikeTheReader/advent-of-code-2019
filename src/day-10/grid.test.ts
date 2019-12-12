import Grid from './grid';

describe('Grid', () => {
  describe('fill', () => {
    it('Fills the grid with a default value', () => {
      const grid = new Grid();
      grid.fill('.', { height: 10, width: 10 });
      expect(grid.getValue(5, 5)).toBe('.');
      expect(grid.getValue(1, 5)).toBe('.');
      expect(grid.getValue(5, 9)).toBe('.');
    });
  });
});
