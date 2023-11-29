import '../ResearchInfo.css'
import { useMemo, useState } from 'react'
import { useLocalStorage } from '@uidotdev/usehooks'
import {
  DARK_THEME_BACKGROUND_COLOR_HEX,
  FUNCTION_COLORS,
} from '../../../conts'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  IFunctionActionsProps,
  IResearchRequest,
  IResearchResponse,
} from '../researchInfo.types'
import { MathComponent } from 'mathjax-react'
import { capitalizeFirstLetter, formatToMathEquation } from '../../../utils'
import { useTranslation } from 'react-i18next'
import useEquationStore from '../researchInfo.store'

const FunctionActions = ({
  equation = '',
  index,
  primaryColor,
}: IFunctionActionsProps) => {
  const { t } = useTranslation()
  const {
    equations: functions,
    updateEquationByIndex,
    removeEquationByIndex,
  } = useEquationStore()
  const [darkMode] = useLocalStorage<boolean>('theme')
  const [newEquation, setNewEquation] = useState<string>(equation)
  const [researchDataVisible, setResearchDataVisible] = useState<boolean>(false)
  const [dataTableVisible, setDataTableVisible] = useState<boolean>(false)
  const requestOptions = useMemo<IResearchRequest>(() => {
    return {
      function: newEquation,
      start: -10,
      final: 10,
      step: 1,
    }
  }, [newEquation])

  const {
    data: researchResult,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['equation'],
    queryFn: async () =>
      await axios
        .post<IResearchResponse>(
          'http://localhost:5116/api/equation/research',
          requestOptions,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => Promise.resolve(response.data))
        .catch((err) => Promise.reject(err)),
  })

  const handleResearchClick = () => {
    if (equation) {
      setResearchDataVisible(!researchDataVisible)
      setDataTableVisible(false)
      console.log('Result: ' + JSON.stringify(researchResult, null, 2))
    }
  }

  const handleTableClick = () => {
    setDataTableVisible(!dataTableVisible)
    setResearchDataVisible(false)
  }

  const handleDelete = () => {
    if (functions.length === 1) return
    removeEquationByIndex(index)
  }

  const handleOnBlur = () => {
    // TODO: check if equation is correct
    if (newEquation) {
      updateEquationByIndex(index, newEquation)
      refetch()
    }
  }

  return (
    <div className="function-container">
      <div className="function-input-container">
        <div
          className="function-color"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <input
          value={newEquation}
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
          onBlur={handleOnBlur}
          onChange={(e) => setNewEquation(e.target.value)}
        />
      </div>
      {researchResult && researchDataVisible && (
        <div className="research-result">
          <div className="math-container">
            <table className="math-table">
              <tbody>
                <tr>
                  <th className="math-header">{t('function')}</th>
                  <td className="math-data">
                    <MathComponent
                      tex={formatToMathEquation(researchResult.function)}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="math-header">{t('derivative')}</th>
                  <td className="math-data">
                    <MathComponent
                      tex={formatToMathEquation(researchResult.derivative)}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="math-header">{t('secondOrderDerivative')}</th>
                  <td className="math-data">
                    <MathComponent
                      tex={formatToMathEquation(
                        researchResult.secondOrderDerivative,
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="math-header">{t('parity')}</th>
                  <td className="math-data">
                    <MathComponent
                      tex={capitalizeFirstLetter(researchResult.parity)}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="math-header">{t('valuesSet')}</th>
                  <td className="math-data">
                    {researchResult.unacceptableArgumentValues.length === 0 ? (
                      <MathComponent tex={`D(x) ∈ R`} />
                    ) : (
                      <MathComponent tex="D(x) ∈ (-∞, -1) U (1, +∞)" />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {dataTableVisible && researchResult && (
        <table className="data-table">
          <thead>
            <tr>
              <th>X</th>
              <th>Y</th>
            </tr>
          </thead>
          <tbody>
            {researchResult.points.map((point, index) => (
              <tr key={index}>
                <td>{point.x}</td>
                <td>{point.y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="actions-bar" style={{ backgroundColor: primaryColor }}>
        <div className="action" onClick={handleResearchClick}>
          {isLoading ? (
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: '24px', color: 'white' }}
            ></i>
          ) : (
            <i
              className="pi pi-search"
              style={{ fontSize: '24px', color: 'white' }}
            ></i>
          )}
        </div>
        <div className="action" onClick={handleTableClick}>
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
        <div className="action" onClick={handleDelete}>
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
