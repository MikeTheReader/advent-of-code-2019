import { AsteroidMap } from './asteroids';

describe('asteroids', () => {
  describe('AsteroidMap', () => {
    describe('constructor', () => {
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
        const mapOne = new AsteroidMap(mapOneStr);
        expect(mapOne.getCoordinate(5, 8)).toBe('#');

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
        const mapTwo = new AsteroidMap(mapTwoStr);
        expect(mapTwo.getCoordinate(1, 2)).toBe('#');

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
        const mapThree = new AsteroidMap(mapThreeStr);
        expect(mapThree.getCoordinate(6, 3)).toBe('#');
      });
    });
    describe('with constructed maps as test cases', () => {
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
      const mapOne = new AsteroidMap(mapOneStr);

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
      const mapTwo = new AsteroidMap(mapTwoStr);

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
      const mapThree = new AsteroidMap(mapThreeStr);

      describe('findBestStation', () => {
        it('returns correct station location', () => {
          expect(mapOne.findBestStation()).toEqual({ x: 5, y: 8 });
          expect(mapTwo.findBestStation()).toEqual({ x: 5, y: 8 });
          expect(mapThree.findBestStation()).toEqual({ x: 5, y: 8 });
        });
      });
    });
  });
});
