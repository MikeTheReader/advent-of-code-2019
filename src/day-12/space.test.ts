import { applyGravity, applyVelocity, parsePlanet } from './space';

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
        y: -1,
        z: 1
      });
      expect(planetTwo.velocity).toEqual({
        x: 0,
        y: 1,
        z: -1
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
});
