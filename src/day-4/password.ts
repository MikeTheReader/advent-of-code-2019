interface PreviousValue {
  value?: number;
}

export function isValidPassword(candidate: number): boolean {
  const digits = getDigits(candidate);
  const isRightLength = digits.length === 6;
  const incrementingDigits = hasIncrementingDigits(digits);
  const includesDouble = hasDoubleOrMore(digits);
  return incrementingDigits && includesDouble && isRightLength;
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
    .split("")
    .map(n => +n);
}

function hasDoubleOrMore(digits: number[]) {
  const previous: PreviousValue = {};
  let hasDouble = false;
  digits.forEach(dig => {
    if (previous.value && previous.value === dig) {
      hasDouble = true;
    }
    previous.value = dig;
  });
  return hasDouble;
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
