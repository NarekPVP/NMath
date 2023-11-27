import { useLocalStorage } from '@uidotdev/usehooks'
import '../ResearchInfo.css'
import { DARK_THEME_BACKGROUND_COLOR_HEX } from '../../../conts'

interface IFunctionActionsProps {
  equation: string
  primaryColor: string
}

const FunctionActions = ({ equation, primaryColor }: IFunctionActionsProps) => {
  const [darkMode] = useLocalStorage<boolean>('theme')

  return (
    <div className="function-container">
      <div className="function-input-container">
        <div
          className="function-color"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <input
          value={equation}
          placeholder=""
          className="function-input"
          style={
            darkMode
              ? {
                  backgroundColor: DARK_THEME_BACKGROUND_COLOR_HEX,
                  color: 'white',
                }
              : {}
          }
        />
      </div>
      <div className="actions-bar" style={{ backgroundColor: primaryColor }}>
        <div className="action">
          <i
            className="pi pi-search"
            style={{ fontSize: '24px', color: 'white' }}
          ></i>
        </div>
        <div className="action">
          <i
            className="pi pi-table"
            style={{ fontSize: '24px', color: 'white' }}
          ></i>
        </div>
        <div className="action">
          <i
            className="pi pi-eye-slash"
            style={{ fontSize: '24px', color: 'white' }}
          ></i>
        </div>
        <div className="action">
          <i
            className="pi pi-trash"
            style={{ fontSize: '24px', color: 'white' }}
          ></i>
        </div>
      </div>
    </div>
  )
}

export default FunctionActions
