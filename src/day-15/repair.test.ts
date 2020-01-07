import { findOxygenSteps } from './repair';

describe('repair', () => {
  describe('findOxygen', () => {
    it('expected results', () => {
      let firstTime = true;
      const processor = (input: number) => {
        switch (input) {
          case 1:
          case 2:
          case 3:
            return 0;
          case 4:
            const returnValue = firstTime ? 1 : 2;
            firstTime = false;
            return returnValue;
        }
      };
      expect(findOxygenSteps(processor)).toBe(1);
    });
  });
});
