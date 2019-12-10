import { ingestMap } from './asteroids';

describe('asteroids', () => {
  describe('ingestMap', () => {
    it('ingests the test maps correctly', () => {
      const mapOneStr =
        '......#.#.\n' +
        '#..#.#....\n' +
        '..#######.\n' +
        '.#.#.###..\n' +
        '.#..#.....\n' +
        '..#....#.#\n' +
        '#..#....#.\n' +
        '.##.#..###\n' +
        '##...#..#.\n' +
        '.#....####';
      expect(ingestMap(mapOneStr)[5][8]).toBe('#');

      const mapTwoStr =
        '#.#...#.#.\n' +
        '.###....#.\n' +
        '.#....#...\n' +
        '##.#.#.#.#\n' +
        '....#.#.#.\n' +
        '.##..###.#\n' +
        '..#...##..\n' +
        '..##....##\n' +
        '......#...\n' +
        '.####.###.';
      expect(ingestMap(mapTwoStr)[1][2]).toBe('#');

      const mapThreeStr =
        '.#..#..###\n' +
        '####.###.#\n' +
        '....###.#.\n' +
        '..###.##.#\n' +
        '##.##.#.#.\n' +
        '....###..#\n' +
        '..#.#..#.#\n' +
        '#..#.#.###\n' +
        '.##...##.#\n' +
        '.....#.#..';
      expect(ingestMap(mapThreeStr)[6][3]).toBe('#');
    });
  });
});
