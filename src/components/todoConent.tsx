import React, { useState } from 'react'
import styled from 'styled-components'
import {
  addTodo,
  completeTodo,
  deleteTodo,
  undoTodo,
} from '../redux/modules/todoslice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/config/configStore'
function TodoConent() {
  const [addTitle, setAddTitle] = useState('') // 제목입력
  const [addInput, setAddInput] = useState('') // 내용입력
  const [newTodo, setNewTodo] = useState()
  const todosTodo = useSelector((state: RootState) => state.todos)
  console.log(todosTodo)
  const dispatch = useDispatch()

  const addTitleFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddTitle(event.target.value)
  } //제목 함수

  const addInputFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddInput(event.target.value)
  } //내용 함수

  const checkTodo = (event: React.FormEvent<HTMLFormElement>) => {
    //입력 버튼
    event.preventDefault()
    dispatch(
      addTodo({
        id: todosTodo.data.length + 1,
        title: addTitle,
        contents: addInput,
        isDone: false,
      })
    )
    setAddTitle('')
    setAddInput('')
  }

  const checkSuccessBt = (id: number) => {
    //성공 버튼
    dispatch(completeTodo(id))
  }
  const DeleteBt = (id: number) => {
    // 삭제 버튼
    dispatch(deleteTodo(id))
  }
  const RemoveBt = (id: number) => {
    // 되돌리기 버튼
    dispatch(undoTodo(id))
  }
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
        {todosTodo.data
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
        {todosTodo.data
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
