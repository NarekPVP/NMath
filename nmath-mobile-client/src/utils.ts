import { DARK_THEME_BACKGROUND_COLOR_HEX } from './types/Consts'

export function divideIfNotZero(numerator: number, denominator: number) {
  if (denominator === 0 || isNaN(denominator)) {
    return null
  } else {
    return numerator / denominator
  }
}

export function capitalizeFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export function getBackgroundColor(darkTheme: boolean) {
  return darkTheme ? DARK_THEME_BACKGROUND_COLOR_HEX : '#fff'
}

export function getTextColor(darkTheme: boolean) {
  return darkTheme ? '#fff' : '#000'
}
