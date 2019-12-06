import { Galaxy } from './galaxy';

describe('galaxy', () => {
  describe('addOrbit', () => {
    it('adds an orbit link', () => {
      const galaxy = new Galaxy();
      galaxy.addOrbit('COM)B');
      expect(galaxy.getRoot()).toEqual({
        name: 'COM',
        orbiters: [{ name: 'B' }],
        orbits: []
      });
    });
  });
});
