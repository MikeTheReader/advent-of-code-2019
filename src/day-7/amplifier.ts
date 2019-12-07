export function amplify(program: number[]): number {
  return 0;
}

export function getAllPermutations(original: number[]): number[][] {
  const permutations = [];
  function permute(digits: number[], size: number, n: number) {
    if (size === 1) {
      permutations.push(digits.slice());
    }
    for (let i = 0; i < size; i++) {
      permute(digits, size - 1, n);

      if (size % 2 === 1) {
        const buffer = digits[0];
        digits[0] = digits[size - 1];
        digits[size - 1] = buffer;
      } else {
        const buffer = digits[i];
        digits[i] = digits[size - 1];
        digits[size - 1] = buffer;
      }
    }
  }
  permute(original, original.length, original.length);
  return permutations;
}
