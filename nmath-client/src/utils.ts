export function roundWithDecimals(
  num: number,
  decimalPlaces: number = 2,
): number {
  const multiplier = Math.pow(10, decimalPlaces)
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier
}

export function capitalizeFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export function formatToMathEquation(str: string): string {
  return str.replace('*', '')
}
