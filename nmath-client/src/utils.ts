export function roundWithDecimals(
  num: number,
  decimalPlaces: number = 2,
): number {
  const multiplier = Math.pow(10, decimalPlaces)
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier
}
