export function getInitialPortions(value) {
  const portions = Number(value);
  return Number.isInteger(portions) && portions > 0 ? portions : 4;
}

export function adjustPortions(value, delta) {
  return getInitialPortions(value) + delta;
}
