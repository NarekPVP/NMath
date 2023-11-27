import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import SectionItem from '../../components/SectionItem'
import { ResearchNavProps } from '../../navigation/ResearchStack/researchStack.types'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { getBackgroundColor } from '../../utils'

const Home = ({ navigation }: ResearchNavProps<'Home'>) => {
  const { isDarkTheme } = useDarkTheme()
  const handleResearchPress = () => {
    navigation.navigate('ResearchInput', {})
  }

  const handleDrawPress = () => navigation.navigate('Draw')

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(isDarkTheme),
        },
      ]}
    >
      <SectionItem text="Research" onPress={handleResearchPress} />
      <SectionItem text="Draw" onPress={handleDrawPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Home
