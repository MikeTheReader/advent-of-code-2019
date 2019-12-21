import { Color, Robot, Turn } from './robot';

describe('robot', () => {
  describe('paint', () => {
    it('returns correct results given mock intcode', () => {
      const mockOutputs = [
        [Color.White, Turn.Left],
        [Color.White, Turn.Right],
        [Color.Black, Turn.Right],
        [Color.White, Turn.Right],
        [Color.White, Turn.Right],
        [Color.Black, Turn.Right],
        [Color.White, Turn.Right],
        [undefined, undefined]
      ];
      const robot = new Robot();
      let index = -1;
      robot.paint(currentSpace => {
        index++;
        return mockOutputs[index];
      });
      expect(index).toBe(7);
      expect(robot.getPaintedPanels()).toBe(4);
    });
  });
});
