import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TodoLocation = {
  id: number
  title: string
  contents: string
  isDone: boolean
}

const initialTodo: TodoLocation[] = [
  {
    id: 1,
    title: '이것은 제목입니다.',
    contents: '이것은 내용입니다.',
    isDone: false,
  },
  {
    id: 2,
    title: '이것은 제목입니다.',
    contents: '이것은 내용입니다.',
    isDone: false,
  },
  {
    id: 3,
    title: '이것은 제목입니다.',
    contents: '이것은 내용입니다.',
    isDone: false,
  },
]

const todoslice = createSlice({
  name: 'todos',
  initialState: {
    data: initialTodo,
  },
  reducers: {
    addTodo: (state, action: PayloadAction<TodoLocation>) => {
      state.data = [...state.data, action.payload]
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      const todo = state.data.find(todos => todos.id === action.payload)
      if (todo) {
        todo.isDone = true
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(todos => todos.id !== action.payload)
    },
    undoTodo: (state, action: PayloadAction<number>) => {
      const todo = state.data.find(todos => todos.id === action.payload)
      if (todo) {
        todo.isDone = false
      }
    },
  },
})

export const { addTodo, completeTodo, deleteTodo, undoTodo } = todoslice.actions

export default todoslice.reducer
