const basePattern = [0, 1, 0, -1];

export function processSignal(inputSignal: string, phases: number = 1): string {
  let signal = inputSignal;
  for (let i = 0; i < phases; i++) {
    signal = processPhase(signal);
  }
  return signal;
}

function processPhase(inputSignal: string) {
  const charactersInSignal = inputSignal.split('');
  const numbersInSignal = charactersInSignal.map(char => +char);
  let result = '';
  numbersInSignal.forEach((num, index) => {
    const pattern = getPatternForIndex(index);
    let i = 1;
    let numTotal = 0;
    numbersInSignal.forEach(digit => {
      if (i >= pattern.length) {
        i = 0;
      }
      numTotal += digit * pattern[i];
      i++;
    });
    result += numTotal
      .toString()
      .split('')
      .pop();
  });
  return result;
}

export function getPatternForIndex(index: number): number[] {
  const pattern = [];
  basePattern.forEach(numberInPattern => {
    for (let i = -1; i < index; i++) {
      pattern.push(numberInPattern);
    }
  });
  return pattern;
}
