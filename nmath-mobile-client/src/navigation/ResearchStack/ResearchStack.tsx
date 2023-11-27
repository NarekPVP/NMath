import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { ResearchParamList } from './researchStack.types'
import Home from '../../screens/Home'
import Research from '../../screens/Research'
import Draw from '../../screens/Draw'
import ResearchInput from '../../screens/ResearchInput'
import ResearchInputHeaderRight from './components/ResearchInputHeaderRight'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { getBackgroundColor, getTextColor } from '../../utils'

const Stack = createStackNavigator<ResearchParamList>()

const ResearchStack = () => {
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
        headerBackTitleStyle: isDarkTheme ? { color: '#fff' } : {},
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ResearchInput"
        component={ResearchInput}
        options={({ route }) => ({
          headerTitle: 'Research',
          headerRight: () => <ResearchInputHeaderRight route={route} />,
        })}
      />
      <Stack.Screen name="Research" component={Research} />
      <Stack.Screen name="Draw" component={Draw} />
    </Stack.Navigator>
  )
}

export default ResearchStack
