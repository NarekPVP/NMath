import '../ResearchInfo.css'
import 'primeicons/primeicons.css'
import { useLocalStorage } from '@uidotdev/usehooks'
import { DARK_THEME_BACKGROUND_COLOR_HEX } from '../../../conts'
import FunctionActions from './FunctionActions'
import { useState } from 'react'

interface IFunctionsMenuProps {
  onAddClick: () => void
}

const FunctionsMenu = ({ onAddClick }: IFunctionsMenuProps) => {
  const [darkMode] = useLocalStorage<boolean>('theme')
  const [menuVisible, setMenuVisible] = useState<boolean>(true)

  function handleMenuPress() {
    setMenuVisible(!menuVisible)
  }

  return (
    <div
      className="function-menu-container"
      style={
        darkMode
          ? {
              backgroundColor: DARK_THEME_BACKGROUND_COLOR_HEX,
              border: '1px solid rgba(255, 255, 255, 0.13)',
            }
          : {}
      }
    >
      <div className="function-menu-header">
        <i className="pi pi-align-justify" onClick={handleMenuPress}></i>
        <i className="pi pi-plus" onClick={onAddClick}></i>
      </div>
      {menuVisible && (
        <>
          <div onClick={() => console.log('x^2 has been clicked!')}>
            <FunctionActions equation="x^2" primaryColor="#3576c6" />
          </div>
          <div>
            <FunctionActions equation="x" primaryColor="#fb5607" />
          </div>
          <div>
            <FunctionActions equation="x^3" primaryColor="#7cc716" />
          </div>
        </>
      )}
    </div>
  )
}

export default FunctionsMenu
