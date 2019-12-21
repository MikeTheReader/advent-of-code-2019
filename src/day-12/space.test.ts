import { applyGravity, applyVelocity, calculateEnergy, parsePlanet, tick } from './space';

describe('space', () => {
  describe('applyGravity', () => {
    it('returns expected results based on example data', () => {
      const planetOne = {
        position: {
          x: 1,
          y: 2,
          z: 3
        },
        velocity: {
          x: 0,
          y: 0,
          z: 0
        }
      };
      const planetTwo = {
        position: {
          x: 1,
          y: 6,
          z: -1
        },
        velocity: {
          x: 0,
          y: 0,
          z: 0
        }
      };
      applyGravity(planetOne, planetTwo);
      expect(planetOne.velocity).toEqual({
        x: 0,
        y: 1,
        z: -1
      });
      expect(planetTwo.velocity).toEqual({
        x: 0,
        y: -1,
        z: 1
      });
    });
  });
  describe('applyVelocity', () => {
    it('modifies the planet velocity correctly', () => {
      const planetOne = {
        position: {
          x: 1,
          y: 2,
          z: 3
        },
        velocity: {
          x: 0,
          y: 5,
          z: -10
        }
      };
      applyVelocity(planetOne);
      expect(planetOne.position).toEqual({
        x: 1,
        y: 7,
        z: -7
      });
    });
  });
  describe('parsePlanet', () => {
    it('returns the correct planet given a string', () => {
      const planetString = '<x=4, y=-8, z=8>';
      expect(parsePlanet(planetString)).toEqual({
        position: {
          x: 4,
          y: -8,
          z: 8
        },
        velocity: {
          x: 0,
          y: 0,
          z: 0
        }
      });
    });
  });
  describe('tick', () => {
    it('moves the planets correctly based on example data', () => {
      const planetStrings = ['<x=-1, y=0, z=2>', '<x=2, y=-10, z=-7>', '<x=4, y=-8, z=8>', '<x=3, y=5, z=-1>'];
      const planets = planetStrings.map(parsePlanet);
      tick(planets);
      expect(planets[0]).toEqual({ position: { x: 2, y: -1, z: 1 }, velocity: { x: 3, y: -1, z: -1 } });
      expect(planets[1]).toEqual({ position: { x: 3, y: -7, z: -4 }, velocity: { x: 1, y: 3, z: 3 } });
      expect(planets[2]).toEqual({ position: { x: 1, y: -7, z: 5 }, velocity: { x: -3, y: 1, z: -3 } });
      expect(planets[3]).toEqual({ position: { x: 2, y: 2, z: 0 }, velocity: { x: -1, y: -3, z: 1 } });
    });
  });
  describe('calculateEnergy', () => {
    it('returns the correct energy for a planet', () => {
      const testPlanet = {
        position: {
          x: 2,
          y: 1,
          z: -3
        },
        velocity: {
          x: -3,
          y: -2,
          z: 1
        }
      };
      expect(calculateEnergy(testPlanet)).toBe(36);
    });
  });
});
