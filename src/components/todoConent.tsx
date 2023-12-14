import React, { useState } from 'react'
import styled from 'styled-components'

type TodoLocation = {
  id: number
  title: string
  contents: string
  isDone: Boolean
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

function TodoConent() {
  const [addTitle, setAddTitle] = useState<TodoLocation['title']>('') // 제목입력
  const [addInput, setAddInput] = useState<TodoLocation['contents']>('') // 내용입력
  const [newTodo, setNewTodo] = useState<TodoLocation[]>(initialTodo)

  const addTitleFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddTitle(event.target.value)
  } //제목 함수

  const addInputFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddInput(event.target.value)
  } //내용 함수

  const checkTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newTodoItem: TodoLocation = {
      id: newTodo.length + 1,
      title: addTitle,
      contents: addInput,
      isDone: false,
    }

    setNewTodo([...newTodo, newTodoItem])
    setAddInput('')
    setAddTitle('')
  } //입력 버튼
  const checkSuccessBt = (id: number) => {
    setNewTodo(
      newTodo.map(todo => (todo.id === id ? { ...todo, isDone: true } : todo))
    )
  } //성공 버튼
  const DeleteBt = (id: number) => {
    setNewTodo(newTodo.filter(todo => todo.id !== id))
  } // 삭제 버튼
  const RemoveBt = (id: number) => {
    setNewTodo(
      newTodo.map(todo => (todo.id === id ? { ...todo, isDone: false } : todo))
    )
  } // 되돌리기 버튼
  return (
    <ScTodoGround>
      <h1>TODO_List</h1>
      <ScSearchBox as="form" onSubmit={checkTodo}>
        제목:
        <input value={addTitle} onChange={addTitleFunc} />
        내용:
        <input value={addInput} onChange={addInputFunc} />
        <button type="submit">입력하기</button>
      </ScSearchBox>
      <h1>할일 목록</h1>

      <ScWorikingList>
        {newTodo
          .filter(item => item.isDone === false)
          .map(todo => (
            <ScTodoFalseBox>
              <h4>{todo.title}</h4>
              <div>{todo.contents}</div>
              <ScButton onClick={() => checkSuccessBt(todo.id)}>완료</ScButton>
              <ScButton onClick={() => DeleteBt(todo.id)}>삭제</ScButton>
            </ScTodoFalseBox>
          ))}
      </ScWorikingList>

      <h1>완료한 목록 </h1>
      <ScWorikingList>
        {newTodo
          .filter(item => item.isDone === true)
          .map(todo => (
            <ScTodoTrueBox>
              <h4>{todo.title}</h4>
              <div>{todo.contents}</div>
              <ScButton onClick={() => RemoveBt(todo.id)}>되돌리기</ScButton>
              <ScButton onClick={() => DeleteBt(todo.id)}>삭제</ScButton>
            </ScTodoTrueBox>
          ))}
      </ScWorikingList>
    </ScTodoGround>
  )
}
const ScTodoGround = styled.div`
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  position: relative;
  display: block;
  flex-direction: column;
  background-color: white;
  transition: all 0.5s;
`

const ScTodoFalseBox = styled.div`
  width: 250px;
  height: 150px;
  border: 3px solid black;
  border-radius: 10px;
  margin-top: 15px;
  padding-top: 10px;
  text-align: center;
  margin-right: 10px;
`
const ScTodoTrueBox = styled.div`
  width: 250px;
  height: 150px;
  border: 3px solid red;
  border-radius: 10px;
  margin-top: 15px;
  padding-top: 10px;
  text-align: center;
  margin-right: 10px;
`
const ScSearchBox = styled.form`
  background-color: gray;
  height: 50px;
`
const ScWorikingList = styled.div`
  display: flex;
  flex-direction: row;
`
const ScButton = styled.button`
  width: 70px;
  height: 30px;
  margin-left: 5px;
  margin-top: 10px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
  background-color: white;
  &hover {
  }
`
export default TodoConent
