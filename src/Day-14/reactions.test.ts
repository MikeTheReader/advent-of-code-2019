import { calculateFuelWithOre, calculateOre, parseAllReactions, parseReaction } from './reactions';

describe('reactions', () => {
  describe('parseReaction', () => {
    it('returns expected data based on simple example', () => {
      const inputOne = '114 ORE => 4 BHXH';
      expect(parseReaction(inputOne)).toEqual({
        BHXH: {
          inputs: [
            {
              chemical: 'ORE',
              quantity: 114
            }
          ],
          outputQuantity: 4
        }
      });
    });
    it('returns expected data based on more complex example', () => {
      const inputOne = '1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP';
      expect(parseReaction(inputOne)).toEqual({
        XMNCP: {
          inputs: [
            {
              chemical: 'MZWV',
              quantity: 1
            },
            {
              chemical: 'XDBXC',
              quantity: 17
            },
            {
              chemical: 'XCVML',
              quantity: 3
            }
          ],
          outputQuantity: 2
        }
      });
    });
  });
  describe('parseAllReactions', () => {
    it('returns expected full mapping object', () => {
      const reactions = [
        '10 ORE => 10 A',
        '1 ORE => 1 B',
        '7 A, 1 B => 1 C',
        '7 A, 1 C => 1 D',
        '7 A, 1 D => 1 E',
        '7 A, 1 E => 1 FUEL'
      ];
      expect(parseAllReactions(reactions)).toEqual({
        FUEL: {
          inputs: [
            {
              chemical: 'A',
              quantity: 7
            },
            {
              chemical: 'E',
              quantity: 1
            }
          ],
          outputQuantity: 1
        },
        E: {
          inputs: [
            {
              chemical: 'A',
              quantity: 7
            },
            {
              chemical: 'D',
              quantity: 1
            }
          ],
          outputQuantity: 1
        },
        D: {
          inputs: [
            {
              chemical: 'A',
              quantity: 7
            },
            {
              chemical: 'C',
              quantity: 1
            }
          ],
          outputQuantity: 1
        },
        C: {
          inputs: [
            {
              chemical: 'A',
              quantity: 7
            },
            {
              chemical: 'B',
              quantity: 1
            }
          ],
          outputQuantity: 1
        },
        B: {
          inputs: [
            {
              chemical: 'ORE',
              quantity: 1
            }
          ],
          outputQuantity: 1
        },
        A: {
          inputs: [
            {
              chemical: 'ORE',
              quantity: 10
            }
          ],
          outputQuantity: 10
        }
      });
    });
  });
  describe('calculateOre', () => {
    it('calculates correct amount based on simple example', () => {
      expect(calculateOre(fuelSteps[0])).toBe(31);
    });
    it('calculates a larger amount for 2 fuel', () => {
      expect(calculateOre(fuelSteps[0], 2)).toBeGreaterThan(31);
    });
    it('can handle large numbers of ore', () => {
      expect(calculateOre(fuelSteps[0], 2000000)).toBe(58000000);
    });
    it('calculates correct amount based on first complex example', () => {
      expect(calculateOre(fuelSteps[1])).toBe(165);
    });
    it('calculates correct amount based on second complex example', () => {
      expect(calculateOre(fuelSteps[2])).toBe(13312);
    });
    it('calculates correct amount based on third complex example', () => {
      expect(calculateOre(fuelSteps[3])).toBe(180697);
    });
    it('calculates correct amount based on fourth complex example', () => {
      expect(calculateOre(fuelSteps[4])).toBe(2210736);
    });
  });
  describe('calculateFuelWithOre', () => {
    const amountOfOre = 1000000000000;
    it('calculates correct amount based on second complex example', () => {
      expect(calculateFuelWithOre(fuelSteps[2], amountOfOre)).toBe(82892753);
    });
    it('calculates correct amount based on third complex example', () => {
      expect(calculateFuelWithOre(fuelSteps[3], amountOfOre)).toBe(5586022);
    });
    it('calculates correct amount based on fourth complex example', () => {
      expect(calculateFuelWithOre(fuelSteps[4], amountOfOre)).toBe(460664);
    });
  });
});

const fuelSteps = [
  ['10 ORE => 10 A', '1 ORE => 1 B', '7 A, 1 B => 1 C', '7 A, 1 C => 1 D', '7 A, 1 D => 1 E', '7 A, 1 E => 1 FUEL'],
  [
    '9 ORE => 2 A',
    '8 ORE => 3 B',
    '7 ORE => 5 C',
    '3 A, 4 B => 1 AB',
    '5 B, 7 C => 1 BC',
    '4 C, 1 A => 1 CA',
    '2 AB, 3 BC, 4 CA => 1 FUEL'
  ],
  [
    '157 ORE => 5 NZVS',
    '165 ORE => 6 DCFZ',
    '44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL',
    '12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ',
    '179 ORE => 7 PSHF',
    '177 ORE => 5 HKGWZ',
    '7 DCFZ, 7 PSHF => 2 XJWVT',
    '165 ORE => 2 GPVTF',
    '3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT'
  ],
  [
    '2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG',
    '17 NVRVD, 3 JNWZP => 8 VPVL',
    '53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL',
    '22 VJHF, 37 MNCFX => 5 FWMGM',
    '139 ORE => 4 NVRVD',
    '144 ORE => 7 JNWZP',
    '5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC',
    '5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV',
    '145 ORE => 6 MNCFX',
    '1 NVRVD => 8 CXFTF',
    '1 VJHF, 6 MNCFX => 4 RFSQX',
    '176 ORE => 6 VJHF'
  ],
  [
    '171 ORE => 8 CNZTR',
    '7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL',
    '114 ORE => 4 BHXH',
    '14 VRPVC => 6 BMBT',
    '6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL',
    '6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT',
    '15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW',
    '13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW',
    '5 BMBT => 4 WPTQ',
    '189 ORE => 9 KTJDG',
    '1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP',
    '12 VRPVC, 27 CNZTR => 2 XDBXC',
    '15 KTJDG, 12 BHXH => 5 XCVML',
    '3 BHXH, 2 VRPVC => 7 MZWV',
    '121 ORE => 7 VRPVC',
    '7 XCVML => 6 RJRHP',
    '5 BHXH, 4 VRPVC => 5 LTCX'
  ]
];
