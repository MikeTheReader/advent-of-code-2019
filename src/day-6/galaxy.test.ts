import { Galaxy } from './galaxy';

describe('galaxy', () => {
  describe('addOrbit', () => {
    it('adds an orbit link', () => {
      const expectedRoot = { name: 'COM', orbits: null, orbiters: [] };
      const expectedOrbiter = { name: 'B', orbits: expectedRoot, orbiters: [] };
      expectedRoot.orbiters = [expectedOrbiter];

      const galaxy = new Galaxy();
      galaxy.addOrbit('COM)B');
      expect(galaxy.getRoot()).toEqual(expectedRoot);
    });
  });
  describe('countOrbits', () => {
    it('returns the correct count based on the example data', () => {
      const galaxy = new Galaxy();
      const orbits = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L'];
      orbits.forEach(orbit => galaxy.addOrbit(orbit));
      expect(galaxy.countOrbits()).toBe(42);
    });
  });
  describe('findDistance', () => {
    it('returns the correct distance based on the example data', () => {
      const galaxy = new Galaxy();
      const orbits = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', 'K)YOU', 'I)SAN'];
      orbits.forEach(orbit => galaxy.addOrbit(orbit));
      expect(galaxy.findDistance('YOU', 'SAN')).toBe(4);
    });
  });
});
