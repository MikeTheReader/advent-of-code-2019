interface PreviousValue {
  value?: number;
}

export function isValidPassword(candidate: number): boolean {
  const digits = candidate
    .toString()
    .split("")
    .map(n => +n);
  if (digits.length !== 6) {
    return false;
  }

  let previous: PreviousValue = {};
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

  previous = {};
  let hasDouble = false;
  digits.forEach(dig => {
    if (previous.value && previous.value === dig) {
      hasDouble = true;
    }

    previous.value = dig;
  });

  return incrementingDigits && hasDouble;
}

export function isReallyValidPassword(candidate: number): boolean {
  if (!isValidPassword(candidate)) {
    return false;
  }
  const digits = candidate
    .toString()
    .split("")
    .map(n => +n);

  let hasDouble = false;
  for (let i = 0; i < 10; i++) {
    const numDigits = digits.filter(dig => dig === i);
    if (numDigits.length === 2) {
      hasDouble = true;
    }
  }
  return hasDouble;
}
