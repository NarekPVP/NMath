import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SettingsParamList } from './settingsStack.types'
import Settings from '../../screens/Settings'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { DARK_THEME_BACKGROUND_COLOR_HEX } from '../../types/Consts'
import { getBackgroundColor, getTextColor } from '../../utils'

const Stack = createStackNavigator<SettingsParamList>()

const SettingsStack = () => {
  const { isDarkTheme } = useDarkTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: getBackgroundColor(isDarkTheme),
        },
        headerTitleStyle: {
          color: getTextColor(isDarkTheme),
        },
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}

export default SettingsStack
