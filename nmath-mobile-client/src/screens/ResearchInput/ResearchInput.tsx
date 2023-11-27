import React, { useEffect, useRef, useState } from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import { ResearchNavProps } from '../../navigation/ResearchStack/researchStack.types'
import MathView from '../../components/MathView'
import { getTextColor } from '../../utils'
import { useDarkTheme } from '../../hooks/useDarkTheme'

const ResearchInput = ({ navigation }: ResearchNavProps<'ResearchInput'>) => {
  const submit = useRef(() => {})
  const [equation, setEquation] = useState<string>('')
  const { isDarkTheme } = useDarkTheme()
  const [errorMsg, setErrorMsg] = useState<string>('')

  submit.current = () => {
    if (equation) {
      const formattedEquation = equation.replace(/(\d)x/g, '$1*x')
      console.log(
        'Equation: ' + equation + ' formattedEquation: ' + formattedEquation,
      )
      navigation.navigate('Research', { equation: formattedEquation })
    } else {
      setErrorMsg('Please enter equation')
    }
  }

  useEffect(() => {
    navigation.setParams({ submit })
  }, [])

  return (
    <View style={styles.container}>
      <MathView
        equation={'f(x) = ' + equation}
        fontSize={22}
        color={getTextColor(isDarkTheme)}
      />
      <TextInput
        style={[styles.input, { color: getTextColor(isDarkTheme) }]}
        placeholder="Enter equation..."
        value={equation}
        onChange={(e) => setEquation(e.nativeEvent.text)}
        autoCapitalize="none"
        placeholderTextColor={getTextColor(isDarkTheme)}
      />
      {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
  },
})

export default ResearchInput
