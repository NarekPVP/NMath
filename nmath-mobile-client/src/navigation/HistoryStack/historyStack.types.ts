import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from "@react-navigation/stack"

export type HistoryParamList = {
  History: undefined
}

export type HistoryNavProps<T extends keyof HistoryParamList> = {
  navigation: StackNavigationProp<HistoryParamList, T>
  route: RouteProp<HistoryParamList, T>
}
