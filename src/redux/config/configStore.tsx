import { configureStore } from '@reduxjs/toolkit'
import todoslice from '../modules/todoslice'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    todos: todoslice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
