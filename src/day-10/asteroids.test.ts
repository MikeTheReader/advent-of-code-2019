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
          expect(mapOne.findBestStation()).toEqual([{ x: 5, y: 8 }, 33]);
          expect(mapTwo.findBestStation()).toEqual([{ x: 1, y: 2 }, 35]);
          expect(mapThree.findBestStation()).toEqual([{ x: 6, y: 3 }, 41]);
        });
      });

      describe('findBestStation', () => {
        it('returns the correct response for sample map', () => {
          const map =
            '#.........\n' +
            '...#......\n' +
            '...#..#...\n' +
            '.####....a\n' +
            '..#.#.#...\n' +
            '.....#....\n' +
            '..###.#.##\n' +
            '.......#..\n' +
            '....#...#.\n' +
            '...#..#..#\n';
          const asteroidMap = new AsteroidMap(map);
          expect(asteroidMap.countVisibleStations({ x: 0, y: 0 })).toBe(7);
        });
        it('returns the correct count for the first test map', () => {
          expect(mapOne.countVisibleStations({ x: 9, y: 5 })).toBeLessThan(33);
          expect(mapOne.countVisibleStations({ x: 5, y: 8 })).toBe(33);
          expect(mapTwo.countVisibleStations({ x: 1, y: 2 })).toBe(35);
          expect(mapThree.countVisibleStations({ x: 6, y: 3 })).toBe(41);
        });
      });
    });
    describe('obliterate', () => {
      it('returns correct order based on small maps in description', () => {
        const mapStr =
          '.#....#####...#..\n' +
          '##...##.#####..##\n' +
          '##...#...#.#####.\n' +
          '..#..........###..\n' +
          '..#.#.....#....##\n';
        const map = new AsteroidMap(mapStr);
        const asteroidsDestroyed = map.obliterate({ x: 8, y: 3 });
        expect(asteroidsDestroyed[0]).toEqual({ x: 8, y: 1 });
        expect(asteroidsDestroyed[1]).toEqual({ x: 9, y: 0 });
        expect(asteroidsDestroyed[2]).toEqual({ x: 9, y: 1 });
        expect(asteroidsDestroyed[3]).toEqual({ x: 10, y: 0 });
        expect(asteroidsDestroyed[4]).toEqual({ x: 9, y: 2 });
        expect(asteroidsDestroyed[5]).toEqual({ x: 11, y: 1 });
        expect(asteroidsDestroyed[6]).toEqual({ x: 12, y: 1 });
        expect(asteroidsDestroyed[7]).toEqual({ x: 11, y: 2 });
        expect(asteroidsDestroyed[8]).toEqual({ x: 15, y: 1 });
      });
      it('returns correct order based on small maps in description', () => {
        const mapStr =
          '.#..##.###...#######\n' +
          '##.############..##.\n' +
          '.#.######.########.#\n' +
          '.###.#######.####.#.\n' +
          '#####.##.#.##.###.##\n' +
          '..#####..#.#########\n' +
          '####################\n' +
          '#.####....###.#.#.##\n' +
          '##.#################\n' +
          '#####.##.###..####..\n' +
          '..######..##.#######\n' +
          '####.##.####...##..#\n' +
          '.#####..#.######.###\n' +
          '##...#.##########...\n' +
          '#.##########.#######\n' +
          '.####.#.###.###.#.##\n' +
          '....##.##.###..#####\n' +
          '.#.#.###########.###\n' +
          '#.#.#.#####.####.###\n' +
          '###.##.####.##.#..##\n';
        const map = new AsteroidMap(mapStr);
        const asteroidsDestroyed = map.obliterate({ x: 11, y: 13 });
        expect(asteroidsDestroyed[0]).toEqual({ x: 11, y: 12 });
        expect(asteroidsDestroyed[1]).toEqual({ x: 12, y: 1 });
        expect(asteroidsDestroyed[2]).toEqual({ x: 12, y: 2 });
        expect(asteroidsDestroyed[9]).toEqual({ x: 12, y: 8 });
        expect(asteroidsDestroyed[19]).toEqual({ x: 16, y: 0 });
        expect(asteroidsDestroyed[49]).toEqual({ x: 16, y: 9 });
        expect(asteroidsDestroyed[99]).toEqual({ x: 10, y: 16 });
        expect(asteroidsDestroyed[198]).toEqual({ x: 9, y: 6 });
        expect(asteroidsDestroyed[199]).toEqual({ x: 8, y: 2 });
      });
    });
  });
});
