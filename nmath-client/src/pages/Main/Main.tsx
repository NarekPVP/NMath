import { useLocalStorage } from '@uidotdev/usehooks'
import { MathComponent } from 'mathjax-react'
import { ChangeEvent, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate()
  const [equation, setEquation] = useState<string>('x^2')
  const [darkMode] = useLocalStorage<boolean>('theme')

  const onEquationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEquation(e.target.value)
  }

  const handleResearchPress = () => {
    navigate(`/research/${encodeURIComponent(equation)}`, { state: { equation } })
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

  return (
    <div style={{ marginTop: '100px', ...styles }}>
      <MathComponent tex={String.raw`f(x)=${equation}`} />
      <Container className="d-flex justify-content-center align-items-center">
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="inputField">
                <Form.Control
                  type="text"
                  placeholder="Enter function to research"
                  style={{ marginRight: '0', width: '500px' }}
                  onChange={onEquationChange}
                  value={equation}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Button
              variant="dark"
              style={{ marginLeft: '0' }}
              onClick={handleResearchPress}
            >
              Research
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Main
