import { getPatternForIndex, processFullSignal, processSignal } from './transmission';

describe('trasmission', () => {
  test('processSignal', () => {
    const inputSignal = '12345678';
    const output = processSignal(inputSignal);
    expect(output).toBe('48226158');

    const secondPhaseOutput = processSignal(inputSignal, 2);
    expect(secondPhaseOutput).toBe('34040438');
  });

  test('getPatternForIndex', () => {
    expect(getPatternForIndex(0)).toEqual([0, 1, 0, -1]);
    expect(getPatternForIndex(1)).toEqual([0, 0, 1, 1, 0, 0, -1, -1]);
    expect(getPatternForIndex(5)).toEqual([
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ]);
  });

  test('100 phase cases', () => {
    expect(processSignal('80871224585914546619083218645595', 100).startsWith('24176176')).toBe(true);
    expect(processSignal('19617804207202209144916044189917', 100).startsWith('73745418')).toBe(true);
    expect(processSignal('69317163492948606335995924319873', 100).startsWith('52432133')).toBe(true);
  });

  test('second half 100 phase cases', () => {
    expect(processFullSignal('03036732577212944063491565474664')).toEqual('84462026');
    expect(processFullSignal('02935109699940807407585447034323')).toEqual('78725270');
    expect(processFullSignal('03081770884921959731165446850517')).toEqual('53553731');
  });
});
