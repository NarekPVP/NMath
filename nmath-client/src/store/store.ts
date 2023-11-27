import { configureStore } from '@reduxjs/toolkit'
import settingsSlice from '../reducers/settings'
import equationsSlice from '../reducers/equations'

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    equations: equationsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
