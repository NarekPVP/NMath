import { ChangeEvent, useState } from 'react'
import { Navbar, Nav, Container, Modal, Form } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'
import languages from '../../data/languages'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/nmath-logo.png'

function Header() {
  const { i18n, t } = useTranslation()
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [darkMode, saveDarkMode] = useLocalStorage('theme', false)
  const [grid, saveGrid] = useLocalStorage('grid', false)
  const [decimal, saveDecimal] = useLocalStorage('decimal', 2)

  const handleSettingsClick = () => {
    setShowSettingsModal(true)
  }

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false)
  }

  const handleDarkModeToggle = () => {
    saveDarkMode(!darkMode)
  }

  const handleGridToggle = () => {
    saveGrid(!grid)
  }

  const handleDecimalChange = (e: ChangeEvent<HTMLInputElement>) => {
    saveDecimal(Number(e.target.value))
  }

  const darkStyles = {
    color: 'white',
    backgroundColor: 'black',
  }

  const lightStyles = {
    color: 'black',
    backgroundColor: 'white',
  }

  const styles = darkMode ? darkStyles : lightStyles

  const onChangeLang = (e: ChangeEvent<HTMLSelectElement>) => {
    const langCode = e.target.value
    i18n.changeLanguage(langCode)
  }

  return (
    <div style={{ paddingTop: '100px', ...styles }}>
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        bg={darkMode ? 'dark' : 'light'}
        variant={darkMode ? 'dark' : 'light'}
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              style={{
                width: 70,
                height: 70,
              }}
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Nav.Link href="#features">{t('research')}</Nav.Link>
              </Link>
              <Link to="/history" style={{ textDecoration: 'none' }}>
                <Nav.Link href="#pricing">{t('history')}</Nav.Link>
              </Link>
            </Nav>
            <Nav>
              <Form.Select onChange={onChangeLang}>
                {languages.map((lang) => (
                  <>
                    {lang.code === i18n.language ? (
                      <option value={lang.code} selected>
                        {lang.label}
                      </option>
                    ) : (
                      <option value={lang.code}>{lang.label}</option>
                    )}
                  </>
                ))}
              </Form.Select>
              <Nav.Link onClick={handleSettingsClick}>
                <i className="pi pi-ellipsis-v"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Outlet />
      </div>

      {/* Settings Modal */}
      <Modal show={showSettingsModal} onHide={handleCloseSettingsModal}>
        <Modal.Header closeButton>
          <h4 className="modal-title">Settings</h4>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="darkModeToggle"
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                />
                <label
                  className="custom-control-label"
                  htmlFor="darkModeToggle"
                >
                  Dark Mode
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="gridToggle"
                  checked={grid}
                  onChange={handleGridToggle}
                />
                <label className="custom-control-label" htmlFor="gridToggle">
                  Grid (Chart)
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="decimalInput">Decimal</label>
              <input
                id="decimalInput"
                type="number"
                min="1"
                className="form-control"
                onChange={handleDecimalChange}
                value={decimal}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Header
