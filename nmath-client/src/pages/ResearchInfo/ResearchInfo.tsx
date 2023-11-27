import './ResearchInfo.css'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'
import { MathComponent } from 'mathjax-react'
import functionPlot, { FunctionPlotDatum } from 'function-plot'
import { ResearchParams } from './researchInfo.types'
import { roundWithDecimals } from '../../utils'
import FunctionsMenu from './components/FunctionsMenu'
import useAppSelector from '../../hooks/useAppSelector'
import { useDispatch } from 'react-redux'
import { addEquation, selectEquations } from '../../reducers/equations'

const contentsBounds = document.body.getBoundingClientRect()
let width = 800
let height = 500
const ratio = contentsBounds.width / width
width *= ratio
height *= ratio

const ResearchInfo = () => {
  const { equation } = useParams<ResearchParams>()
  const dispatch = useDispatch()
  const [grid] = useLocalStorage<boolean>('grid')
  const [decimal] = useLocalStorage<number>('decimal')
  const [darkMode] = useLocalStorage<boolean>('theme')
  const [acceptableValuesDistance, setAcceptableValuesDistance] =
    useState<string>(`D(x)\in(-\infty;+\infty)`)
  const functions = useAppSelector(selectEquations)

  const unacceptableValues = [-1, 1]

  useEffect(() => {
    console.log(equation)
    dispatch(
      addEquation({
        fn: equation,
      }),
    )
    console.log(functions)
  }, [dispatch, equation,])

  const toggleColors = (elements: HTMLElement[], color: string) => {
    elements.forEach((element) => {
      element.style.fill = color
      element.style.stroke = color
    })
  }

  const originPaths = document.getElementsByClassName(
    'origin',
  ) as HTMLCollectionOf<HTMLElement>
  const tickElements = document.getElementsByClassName(
    'tick',
  ) as HTMLCollectionOf<SVGElement>
  const textsElements = document.getElementsByTagName('text')

  const toggleOriginPathColor = (isDarkMode: boolean) => {
    const origins = Array.from(originPaths)
    const ticks = Array.from(tickElements)
    const texts = Array.from(textsElements)

    const color = isDarkMode ? 'white' : 'black'

    toggleColors(origins, color)

    ticks.forEach((item) => {
      const lineTags = item.getElementsByTagName('line')
      const lines = Array.from(lineTags)

      lines.forEach((line) => {
        if (isDarkMode) {
          line.setAttribute('stroke', 'white')
        } else {
          line.setAttribute('stroke', 'black')
        }
      })
    })

    texts.forEach((text) => {
      if (isDarkMode) {
        text.setAttribute('fill', 'white')
      } else {
        text.setAttribute('fill', 'black')
      }
    })
  }

  useEffect(() => {
    if (unacceptableValues.length) {
      setAcceptableValuesDistance(
        `D(x)\in(${unacceptableValues[0]};${unacceptableValues[1]})`,
      )
    }
  }, [unacceptableValues])

  useEffect(() => {
    functionPlot({
      target: '#chart',
      width: width,
      height: height,
      yAxis: { domain: [-1, 9] },
      grid,
      data: [
        ...functions,
        {
          fn: 'x',
        },
        {
          fn: 'x^3',
        },
      ],
      annotations: [
        {
          x: 2,
          y: 1,
          text: 'Annotation',
        },
      ],
      tip: {
        renderer: (x: number, y: number) => {
          return `x: ${roundWithDecimals(x, decimal)},
            y: ${roundWithDecimals(y, decimal)}`
        },
      },
    })

    toggleOriginPathColor(darkMode)
  }, [grid, decimal, darkMode, equation])

  const handleAddFunction = () => {}

  return (
    <main>
      <FunctionsMenu onAddClick={handleAddFunction} />
      <div className="research-container">
        {/* <div>Some information here</div>
        <MathComponent tex="(1, 2)\cup(2, +\infty)" />
        <MathComponent tex={acceptableValuesDistance} />
        <MathComponent tex={`f(x)= ${equation}`} /> */}
        <div
          id="chart"
          onMouseOver={() => toggleOriginPathColor(darkMode)}
          onClick={() => toggleOriginPathColor(darkMode)}
        ></div>
      </div>
    </main>
  )
}

export default ResearchInfo
