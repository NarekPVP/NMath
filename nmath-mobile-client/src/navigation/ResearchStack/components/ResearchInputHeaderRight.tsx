import React from 'react'
import { RouteProp } from '@react-navigation/native'
import { TouchableOpacity, Text } from 'react-native'
import { APP_MAIN_COLOR_HEX } from '../../../types/Consts'
import { ResearchParamList } from '../researchStack.types'

interface IResearchInputHeaderRightProps {
  route: RouteProp<ResearchParamList, 'ResearchInput'>
}

const ResearchInputHeaderRight = ({
  route,
}: IResearchInputHeaderRightProps) => {
  return (
    <TouchableOpacity
      style={{ paddingRight: 12 }}
      onPress={() => route.params.submit?.current()}
    >
      <Text style={{ color: APP_MAIN_COLOR_HEX, fontSize: 18 }}>Done</Text>
    </TouchableOpacity>
  )
}

export default ResearchInputHeaderRight
