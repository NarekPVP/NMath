import { useContext } from 'react'
import {
  DarkThemeContext,
  IDarkThemeContextProps,
} from '../providers/DarkThemeContext'

export const useDarkTheme = (): IDarkThemeContextProps => {
  const context = useContext(DarkThemeContext)

  if (!context) {
    throw new Error('useDarkTheme must be used within a DarkThemeProvider')
  }

  return context
}
