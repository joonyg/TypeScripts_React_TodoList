import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  addTodo,
  completeTodo,
  deleteTodo,
  undoTodo,
} from '../redux/modules/todoslice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/config/configStore'
import axios, { Axios, AxiosInstance } from 'axios'
import { create } from 'domain'

function TodoConent() {
  const [addTitle, setAddTitle] = useState('') // 제목입력
  const [addInput, setAddInput] = useState('') // 내용입력
  const [newTodo, setNewTodo] = useState([])
  //const todosTodo = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch()
  const axiosClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
  })

  const fetchTodoList = async () => {
    try {
      const response = await axiosClient.get('/todo')
      setNewTodo(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTodoList()
  }, [])

  const addTitleFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddTitle(event.target.value)
  } //제목 함수

  const addInputFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddInput(event.target.value)
  } //내용 함수

  const checkTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      await axiosClient.post(`/todo`, {
        id: null,
        title: addTitle,
        content: addInput,
        isDone: false,
      })
      //입력 버튼

      setAddTitle('')
      setAddInput('')
      fetchTodoList()
    } catch (error) {
      console.log(error)
    }
  }

  const checkSuccessBt = async (id: number) => {
    //성공 버튼
    try {
      await axiosClient.patch(`/todo/${id}`, { isDone: true })
      fetchTodoList()
    } catch (error) {
      console.log(error)
    }
  }
  const DeleteBt = async (id: number) => {
    // 삭제 버튼
    try {
      await axiosClient.delete(`/todo/${id}`)
      fetchTodoList()
    } catch (error) {
      console.log(error)
    }
  }
  const RemoveBt = async (id: number) => {
    // 되돌리기 버튼
    try {
      await axiosClient.patch(`/todo/${id}`, { isDone: false })
      fetchTodoList()
    } catch (error) {
      console.log(error)
    }
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
        {newTodo
          .filter((item: any) => item.isDone === false)
          .map((todo: any) => (
            <ScTodoFalseBox key={todo.id}>
              <h4>{todo.title}</h4>
              <div>{todo.content}</div>
              <ScButton onClick={() => checkSuccessBt(todo.id)}>완료</ScButton>
              <ScButton onClick={() => DeleteBt(todo.id)}>삭제</ScButton>
            </ScTodoFalseBox>
          ))}
      </ScWorikingList>

      <h1>완료한 목록 </h1>
      <ScWorikingList>
        {newTodo
          .filter((item: any) => item.isDone === true)
          .map((todo: any) => (
            <ScTodoTrueBox key={todo.id}>
              <h4>{todo.title}</h4>
              <div>{todo.content}</div>
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
