const basePattern = [0, 1, 0, -1];

export function processSignal(inputSignal: string, phases: number = 1): string {
  let signal = inputSignal;
  for (let i = 0; i < phases; i++) {
    signal = processPhase(signal);
  }
  return signal;
}

export function processFullSignal(inputSignal: string) {
  const fullSignal = inputSignal.repeat(10000);

  const offset = +inputSignal.substring(0, 7);
  const numbersInSignal = fullSignal.split('').map(char => +char);
  // console.log(numbersInSignal.slice(offset, offset + 8))
  let result = '';
  for (let i = offset; i < offset + 8; i++) {
    result += processDigit(numbersInSignal, i + 1);
  }
  return result;
}

function processPhase(inputSignal: string) {
  const charactersInSignal = inputSignal.split('');
  const numbersInSignal = charactersInSignal.map(char => +char);
  let result = '';
  numbersInSignal.forEach((num, index) => {
    result += processDigit(numbersInSignal, index);
  });
  return result;
}

function processDigit(numbersInSignal: number[], index: number): string {
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
  return numTotal
    .toString()
    .split('')
    .pop();
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
