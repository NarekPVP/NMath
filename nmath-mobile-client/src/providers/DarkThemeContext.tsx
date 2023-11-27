import AsyncStorage from '@react-native-async-storage/async-storage'
import { ReactNode, createContext, useEffect, useState } from 'react'

export interface IDarkThemeContextProps {
  isDarkTheme: boolean
  toggleDarkTheme: () => void
}

interface IDarkThemeProviderProps {
  children: ReactNode
}

export const DarkThemeContext = createContext<IDarkThemeContextProps>({
  isDarkTheme: false,
  toggleDarkTheme: () => {},
})

export const DarkThemeProvider: React.FC<IDarkThemeProviderProps> = ({
  children,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const loadThemeState = async () => {
      try {
        const storedThemeState = await AsyncStorage.getItem('darkTheme')
        if (storedThemeState !== null) {
          setIsDarkTheme(JSON.parse(storedThemeState))
        }
      } catch (error) {
        console.error('Error loading theme state from AsyncStorage:', error)
      }
    }

    loadThemeState()
  }, [])

  const toggleDarkTheme = async () => {
    const newThemeState = !isDarkTheme
    setIsDarkTheme(newThemeState)

    try {
      await AsyncStorage.setItem('darkTheme', JSON.stringify(newThemeState))
    } catch (error) {
      console.error('Error saving theme state to AsyncStorage:', error)
    }
  }

  return (
    <DarkThemeContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {children}
    </DarkThemeContext.Provider>
  )
}
