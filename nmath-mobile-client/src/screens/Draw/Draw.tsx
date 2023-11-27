import React, { useRef } from 'react'
import { Button, Dimensions, View } from 'react-native'
import { Canvas, CanvasRef } from '@benjeau/react-native-draw'
import { ResearchNavProps } from '../../navigation/ResearchStack/researchStack.types'

const Draw = ({ navigation }: ResearchNavProps<'Draw'>) => {
  const { height } = Dimensions.get('window')
  const canvasRef = useRef<CanvasRef>(null)

  const handleUndo = () => {
    canvasRef.current?.undo()
  }

  const handleClear = () => {
    canvasRef.current?.clear()
  }

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <View>
      <Canvas
        ref={canvasRef}
        height={height - 200}
        thickness={20}
        opacity={0.6}
      />
      <Button title="Undo" onPress={handleUndo} />
      <Button title="Clear" onPress={handleClear} />
      <Button title="Go Back" onPress={handleGoBack} />
    </View>
  )
}

export default Draw
