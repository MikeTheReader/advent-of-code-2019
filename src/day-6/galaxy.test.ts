import { Galaxy } from './galaxy';

describe('galaxy', () => {
  describe('addOrbit', () => {
    it('adds an orbit link', () => {
      const expectedRoot = { name: 'COM', orbits: [], orbiters: [] };
      const expectedOrbiter = { name: 'B', orbits: [expectedRoot], orbiters: [] };
      expectedRoot.orbiters = [expectedOrbiter];

      const galaxy = new Galaxy();
      galaxy.addOrbit('COM)B');
      expect(galaxy.getRoot()).toEqual(expectedRoot);
    });
  });
});
