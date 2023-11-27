import React from 'react'
import { HistoryNavProps } from '../../navigation/HistoryStack/historyStack.types'
import HistoryItem from './components/HistoryItem'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { ResearchNavigation } from '../../navigation/ResearchStack/researchStack.types'

const History = ({ navigation }: HistoryNavProps<'History'>) => {
  const researchNavigation = useNavigation<ResearchNavigation>()

  return (
    <ScrollView>
      <HistoryItem
        text="x^2"
        onPress={() =>
          researchNavigation.navigate('Research', {
            equation: 'x^2',
          })
        }
      />
    </ScrollView>
  )
}

export default History
