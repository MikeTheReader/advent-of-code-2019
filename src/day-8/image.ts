export interface NumberCount {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
}

export interface ImageSize {
  height: number;
  width: number;
}

export function countOccurences(numbers: number[]): NumberCount {
  const count: NumberCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  numbers.forEach(num => count[num]++);
  return count;
}

export function breakUpLayers({ height, width }: ImageSize, image: string): number[][] {
  return null;
}
