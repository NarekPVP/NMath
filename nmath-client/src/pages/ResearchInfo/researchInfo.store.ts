import { FunctionPlotDatum } from 'function-plot'
import { create } from 'zustand'
import { FUNCTION_COLORS } from '../../conts'

type EquationStore = {
  equations: FunctionPlotDatum[]
}

type EquationAction = {
  addEquation: (equation: FunctionPlotDatum) => void
  addEquationByIndex: (index: number, equation: FunctionPlotDatum) => void
  updateEquationByIndex: (index: number, fn: string) => void
  removeEquationByIndex: (index: number) => void
  clearEquations: () => void
}

const useEquationStore = create<EquationStore & EquationAction>()(
  (set, get) => ({
    equations: [],
    addEquation: (equation: FunctionPlotDatum) => {
      set(() => ({
        equations: [...get().equations, equation],
      }))
    },
    addEquationByIndex: (index: number, equation: FunctionPlotDatum) => {
      set(() => ({
        equations: get().equations.splice(index, 0, equation),
      }))
    },
    updateEquationByIndex: (index: number, fn: string) => {
      set(() => {
        const updatedEquations = [...get().equations]

        if (index >= 0 && index < updatedEquations.length) {
          updatedEquations[index] = { ...updatedEquations[index], fn }
        }

        return { equations: updatedEquations }
      })
    },
    removeEquationByIndex: (index: number) => {
      set(() => {
        const updatedEquations = [
          ...get().equations.slice(0, index),
          ...get().equations.slice(index + 1),
        ]

        updatedEquations.map((eq, i) => {
          eq.color = FUNCTION_COLORS[i]
          return eq
        })

        return { equations: updatedEquations }
      })
    },
    clearEquations: () => {
      set(() => ({ equations: [] }))
    },
  }),
)

export default useEquationStore
