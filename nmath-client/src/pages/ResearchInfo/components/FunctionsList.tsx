import '../ResearchInfo.css'
import { useState } from 'react'
import { MathComponent } from 'mathjax-react'
import { FUNCTION_COLORS } from '../../../conts'
import useEquationStore from '../researchInfo.store'
import { isVisible } from '@testing-library/user-event/dist/utils'

const FunctionsList = () => {
  const { equations: functions } = useEquationStore()
  const [visible, setVisible] = useState<boolean>(true)

  const handleClick = () => {
    setVisible(!visible)
  }

  return (
    <div className="functions-list-container">
      <div className="function-menu-header">
        <i className="pi pi-align-justify" onClick={handleClick}></i>
      </div>
      {visible && functions.length > 0 && (
        <ul className="functions-list">
          {functions.map((eq, i) => (
            <>
              {eq.fn && (
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div
                    className="function-color"
                    style={{
                      backgroundColor: FUNCTION_COLORS[i],
                      marginTop: 22.2,
                      paddingLeft: 5,
                    }}
                  ></div>
                  <li>
                    <MathComponent tex={`f(x)=${eq.fn.toString()}`} />
                  </li>
                </div>
              )}
            </>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FunctionsList
