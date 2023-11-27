import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FunctionPlotDatum } from 'function-plot'
import { RootState } from '../store/store'

interface IEquationsState {
  equations: FunctionPlotDatum[]
}

const initialState: IEquationsState = {
  equations: [],
}

const equationsSlice = createSlice({
  name: 'equations',
  initialState,
  reducers: {
    addEquation: (state, action: PayloadAction<FunctionPlotDatum>) => {
      state.equations.push(action.payload)
    },
    removeEquation: (state, action: PayloadAction<string>) => {
      state.equations = state.equations.filter((e) => e.fn !== action.payload)
    },
  },
})

export const { addEquation, removeEquation } = equationsSlice.actions
export const selectEquations = (state: RootState) => state.equations.equations
export default equationsSlice.reducer
