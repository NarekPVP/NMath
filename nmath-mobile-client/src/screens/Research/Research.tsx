import React, { useEffect, useMemo } from 'react'
import { Dimensions, View, StyleSheet, Text, ScrollView } from 'react-native'
import MathView from '../../components/MathView'
import { useQuery } from 'react-query'
import Loading from '../../components/Loading'
import { IResearchRequest, IResearchResponse } from './research.types'
import research from './research.api'
import { ResearchNavProps } from '../../navigation/ResearchStack/researchStack.types'
import {
  capitalizeFirstLetter,
  getBackgroundColor,
  getTextColor,
} from '../../utils'
import { VictoryChart, VictoryLine, VictoryZoomContainer } from 'victory-native'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { APP_MAIN_COLOR_HEX } from '../../types/Consts'
import { useSettings } from '../../hooks/useSettings'
import axios from 'axios'
import DataPoint from '../../types/DatePoint'

const Research = ({ route, navigation }: ResearchNavProps<'Research'>) => {
  const { isDarkTheme } = useDarkTheme()
  const { domainX, domainY, grid } = useSettings()
  const { equation } = route.params
  const { width, height } = Dimensions.get('window')

  interface DataPoint {
    x: number
    y: number
  }  

  interface IResearchResponse {
    function: string
    derivative: string
    secondOrderDerivative: string
    parity: string
    unacceptableArgumentValues: number[]
    min: number
    max: number
    asymptotes: number[]
    points: DataPoint[]
  }

  const requestOptions = useMemo<IResearchRequest>(() => {
    return {
      function: equation,
      start: domainX,
      final: domainY,
      step: 1,
    }
  }, [])

  const { data: researchResult, isLoading } = useQuery({
    queryKey: ['equation'],
    queryFn: async () =>
      await  axios
        .post<IResearchResponse>(
          'http://localhost:5116/api/equation/research',
          requestOptions,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => Promise.resolve(response.data))
        .catch((err) => Promise.reject(err)),
  })

  useEffect(() => {
    console.log('Data: ' + JSON.stringify(researchResult, null, 2))
  }, [researchResult])

  if (isLoading || !researchResult) {
    return <Loading />
  }

  const {
    derivative,
    secondOrderDerivative,
    parity,
    unacceptableArgumentValues,
    points,
  } = researchResult

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor(isDarkTheme) },
      ]}
    >
      {researchResult && (
        <>
          <View style={styles.equationContainer}>
            <MathView
              equation={'f(x) = ' + researchResult.function.replace('*', '')}
              color={getTextColor(isDarkTheme)}
            />
            {!unacceptableArgumentValues.length && (
              <MathView
                equation={`D(x) ∈ R`}
                color={getTextColor(isDarkTheme)}
              />
            )}
            <MathView
              equation={'f′(x) = ' + derivative.replace('*', '')}
              color={getTextColor(isDarkTheme)}
            />
            <MathView
              equation={'f′′(x) = ' + secondOrderDerivative.replace('*', '')}
              color={getTextColor(isDarkTheme)}
            />
            <Text style={[styles.text, { color: getTextColor(isDarkTheme) }]}>
              Parity: {capitalizeFirstLetter(parity)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <VictoryChart
              containerComponent={
                <VictoryZoomContainer
                  zoomDimension="x"
                  zoomDomain={{ x: [domainX, domainY] }}
                />
              }
              width={width}
              height={height}
              domain={[domainX, domainY]}
              style={{
                background: { fill: getBackgroundColor(isDarkTheme) },
              }}
              theme={{
                axis: {
                  style: {
                    tickLabels: {
                      stroke: getTextColor(isDarkTheme),
                      fill: getTextColor(isDarkTheme),
                    },
                    axis: {
                      stroke: getTextColor(isDarkTheme),
                    },
                    grid: {
                      stroke: getTextColor(isDarkTheme),
                      strokeWidth: grid ? 1 : 0,
                    },
                  },
                },
              }}
            >
              <VictoryLine
                data={points}
                style={{
                  data: {
                    stroke: isDarkTheme ? '#c43a31' : APP_MAIN_COLOR_HEX,
                  },
                }}
              />
            </VictoryChart>
          </View>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  equationContainer: {
    marginTop: 10,
  },
  text: {
    fontSize: 22,
  },
})

export default Research
