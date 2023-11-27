import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ISettingsState {
  grid: boolean
  darkMode: boolean
}

const initialState: ISettingsState = {
  grid: true,
  darkMode: true,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setGrid: (state, action: PayloadAction<boolean>) => {
      state.grid = action.payload
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
    },
  },
})

export const { setGrid, setDarkMode } = settingsSlice.actions

export default settingsSlice.reducer
