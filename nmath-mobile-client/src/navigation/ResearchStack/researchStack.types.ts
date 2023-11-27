import { NavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from "@react-navigation/stack"

export type ResearchParamList = {
  Home: undefined,
  ResearchInput: {
    submit?: React.MutableRefObject<() => void>
  },
  Research: {
    equation: string
  },    
  Draw: undefined
}

export type ResearchNavProps<T extends keyof ResearchParamList> = {
  navigation: StackNavigationProp<ResearchParamList, T>
  route: RouteProp<ResearchParamList, T>
}

export type ResearchNavigation = NavigationProp<ResearchParamList>