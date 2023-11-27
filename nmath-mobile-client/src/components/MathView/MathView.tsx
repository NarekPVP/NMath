import React from 'react'
import { MathJaxSvg } from 'react-native-mathjax-html-to-svg'

interface MathViewProps {
  equation: string
  fontSize?: number
  color?: string
}

const MathView = ({
  equation,
  fontSize = 22,
  color = 'black',
}: MathViewProps) => {
  return (
    <MathJaxSvg fontSize={fontSize} color={color} fontCache={true}>
      {`$$${equation}$$`}
    </MathJaxSvg>
  )
}

export default MathView
