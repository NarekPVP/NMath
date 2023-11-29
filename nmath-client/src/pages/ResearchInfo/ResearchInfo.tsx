import './ResearchInfo.css'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'
import functionPlot from 'function-plot'
import { ResearchParams } from './researchInfo.types'
import { roundWithDecimals } from '../../utils'
import FunctionsMenu from './components/FunctionsMenu'
import { FUNCTION_COLORS, MAX_FUNCTIONS_COUNT } from '../../conts'
import useEquationStore from './researchInfo.store'
import FunctionsList from './components/FunctionsList'

let contentsBounds = document.body.getBoundingClientRect()
let width = 800
let height = 500
let ratio = contentsBounds.width / width
width *= ratio
height *= ratio

const ResearchInfo = () => {
  const { equation } = useParams<ResearchParams>()
  const [grid] = useLocalStorage<boolean>('grid')
  const [decimal] = useLocalStorage<number>('decimal')
  const [darkMode] = useLocalStorage<boolean>('theme')
  const equations = useEquationStore((state) => state.equations)
  const addEquation = useEquationStore((state) => state.addEquation)

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
    console.log('zustand equations:', equations)

    functionPlot({
      target: '#chart',
      width: width,
      height: height,
      yAxis: { domain: [-1, 9] },
      grid,
      data: equations,
      annotations: [
        {
          x: 2,
          y: 1,
          text: 'Annotation',
        },
      ],
      tip: {
        xLine: true,
        yLine: true,
        renderer: (x: number, y: number) => {
          return `x: ${roundWithDecimals(x, decimal)},
              y: ${roundWithDecimals(y, decimal)}`
        },
      },
    })

    toggleOriginPathColor(darkMode)
  }, [grid, decimal, darkMode, equations])

  const handleAddFunction = () => {
    if (equations.length < MAX_FUNCTIONS_COUNT) {
      addEquation({
        fn: 'x',
        color: FUNCTION_COLORS[equations.length],
      })
    }
  }

  return (
    <main>
      <>
        <FunctionsMenu onAddClick={handleAddFunction} />
        <FunctionsList />
        <div className="research-container">
          <div
            id="chart"
            onMouseOver={() => toggleOriginPathColor(darkMode)}
            onClick={() => toggleOriginPathColor(darkMode)}
          ></div>
        </div>
      </>
    </main>
  )
}

export default ResearchInfo
