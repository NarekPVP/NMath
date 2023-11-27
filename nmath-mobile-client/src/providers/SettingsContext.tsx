import AsyncStorage from '@react-native-async-storage/async-storage'
import { ReactNode, createContext, useMemo, useState } from 'react'

export interface ISettingsContext {
  grid: boolean
  domainX: number
  domainY: number
  updateSettings: (
    actionType: 'toggleGrid' | 'updateDomainX' | 'updateDomainY',
    value: boolean | number,
  ) => void
}

interface ISettingsProvider {
  children: ReactNode
}

export const SettingsContext = createContext<ISettingsContext>({
  grid: false,
  domainX: -10,
  domainY: 10,
  updateSettings: () => {},
})

export const SettingsProvider = ({ children }: ISettingsProvider) => {
  const [grid, setGrid] = useState<boolean>(false)
  const [domainX, setDomainX] = useState<number>(-10)
  const [domainY, setDomainY] = useState<number>(10)

  const updateSettings = async (
    actionType: 'toggleGrid' | 'updateDomainX' | 'updateDomainY',
    value: boolean | number,
  ) => {
    switch (actionType) {
      case 'toggleGrid':
        setGrid(value as boolean)
        try {
          await AsyncStorage.setItem('grid', JSON.stringify(value))
        } catch (error) {
          console.error('Error saving grid state to AsyncStorage:', error)
        }
        break
      case 'updateDomainX':
        setDomainX(value as number)
        try {
          await AsyncStorage.setItem('domainX', JSON.stringify(value))
        } catch (error) {
          console.error('Error saving domainX state to AsyncStorage:', error)
        }
        break
      case 'updateDomainY':
        setDomainY(value as number)
        try {
          await AsyncStorage.setItem('domainY', JSON.stringify(value))
        } catch (error) {
          console.error('Error saving domainY state to AsyncStorage:', error)
        }
        break
      default:
        console.warn('Invalid action type:', actionType)
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        grid,
        domainX,
        domainY,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
