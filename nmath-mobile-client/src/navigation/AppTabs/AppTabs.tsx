import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppTabsParamList } from './appTabs.types'
import ResearchStack from '../ResearchStack'
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import {
  APP_MAIN_COLOR_HEX,
  DARK_THEME_BACKGROUND_COLOR_HEX,
} from '../../types/Consts'
import SettingsStack from '../SettingsStack/SettingsStack'
import HistoryStack from '../HistoryStack'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { getBackgroundColor } from '../../utils'

const Tab = createBottomTabNavigator<AppTabsParamList>()

const AppTabs = () => {
  const { isDarkTheme } = useDarkTheme()

  console.log('isDarkTheme: ' + isDarkTheme)

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: getBackgroundColor(isDarkTheme),
        },
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: isDarkTheme
              ? DARK_THEME_BACKGROUND_COLOR_HEX
              : '#fff',
          },
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'research') {
              return (
                <MaterialCommunityIcons
                  name="function-variant"
                  size={size}
                  color={color}
                />
              )
            } else if (route.name === 'history') {
              return <MaterialIcons name="history" size={size} color={color} />
            } else if (route.name === 'settings') {
              return <Feather name="settings" size={size} color={color} />
            }
          },
          headerShown: false,
          tabBarActiveTintColor: isDarkTheme ? 'white' : APP_MAIN_COLOR_HEX,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="research" component={ResearchStack} />
        <Tab.Screen name="history" component={HistoryStack} />
        <Tab.Screen name="settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default AppTabs
