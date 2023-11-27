import { createStackNavigator } from '@react-navigation/stack'
import { HistoryParamList } from './historyStack.types'
import History from '../../screens/History'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { DARK_THEME_BACKGROUND_COLOR_HEX } from '../../types/Consts'
import { getBackgroundColor, getTextColor } from '../../utils'

const Stack = createStackNavigator<HistoryParamList>()

const HistoryStack = () => {
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
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  )
}

export default HistoryStack
