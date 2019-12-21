import { applyGravity } from './space';

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
});
