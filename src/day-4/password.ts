interface PreviousValue {
  value?: number;
}

export function isValidPassword(candidate: number): boolean {
  const digits = getDigits(candidate);
  const isRightLength = digits.length === 6;
  return isRightLength && hasIncrementingDigits(digits) && hasDoubleOrMore(digits);
}

export function isReallyValidPassword(candidate: number): boolean {
  if (!isValidPassword(candidate)) {
    return false;
  }
  return hasOnlyDouble(getDigits(candidate));
}

function getDigits(candidate: number) {
  return candidate
    .toString()
    .split('')
    .map(n => +n);
}

function hasDoubleOrMore(digits: number[]) {
  const previous: PreviousValue = {};
  return digits.some(dig => {
    let hasDouble;
    if (previous.value && previous.value === dig) {
      hasDouble = true;
    }
    previous.value = dig;
    return hasDouble;
  });
}

function hasIncrementingDigits(digits: number[]) {
  const previous: PreviousValue = {};
  const incrementingDigits = digits.every(dig => {
    if (!previous.value) {
      previous.value = dig;
    }
    if (previous.value > dig) {
      return false;
    }
    previous.value = dig;
    return true;
  });
  return incrementingDigits;
}

function hasOnlyDouble(digits: number[]) {
  let hasDouble = false;
  for (let i = 0; i < 10; i++) {
    const numDigits = digits.filter(dig => dig === i);
    if (numDigits.length === 2) {
      hasDouble = true;
    }
  }
  return hasDouble;
}
