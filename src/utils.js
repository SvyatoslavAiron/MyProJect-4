export function precentDifference(a, b) {
  if (typeof a !== "number" || typeof b !== "number" || (a === 0 && b === 0)) {
    return 0;
  }
  const average = (a + b) / 2;
  if (average === 0) {
    return 0;
  }

  return 100 * Math.abs((a - b) / average);
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}
