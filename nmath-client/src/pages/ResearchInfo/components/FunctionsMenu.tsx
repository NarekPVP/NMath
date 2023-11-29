import '../ResearchInfo.css'
import 'primeicons/primeicons.css'
import { useState } from 'react'
import { useLocalStorage } from '@uidotdev/usehooks'
import { DARK_THEME_BACKGROUND_COLOR_HEX } from '../../../conts'
import FunctionActions from './FunctionActions'
import useEquationStore from '../researchInfo.store'

interface IFunctionsMenuProps {
  onAddClick: () => void
}

const FunctionsMenu = ({ onAddClick }: IFunctionsMenuProps) => {
  const [darkMode] = useLocalStorage<boolean>('theme')
  const [menuVisible, setMenuVisible] = useState<boolean>(true)
  const functions = useEquationStore(state => state.equations) 

  function handleMenuPress() {
    setMenuVisible(!menuVisible)
  }

  return (
    <div
      className="function-menu-container"
      style={{
        maxHeight: '400px',
        overflowY: 'auto',
        ...(darkMode
          ? {
              backgroundColor: DARK_THEME_BACKGROUND_COLOR_HEX,
              border: '1px solid rgba(255, 255, 255, 0.13)',
            }
          : {}),
      }}
    >
      <div className="function-menu-header">
        <i className="pi pi-align-justify" onClick={handleMenuPress}></i>
        <i className="pi pi-plus" onClick={onAddClick}></i>
      </div>
      {menuVisible && (
        <>
          {functions.map((fn, index) => (
            <div
              key={index}
              onClick={() =>
                console.log(`${fn.fn?.toString()} has been clicked!`)
              }
            >
              <FunctionActions
                equation={fn.fn?.toString()}
                index={index}
                primaryColor={fn.color ? fn.color : '#000'}
              />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default FunctionsMenu
