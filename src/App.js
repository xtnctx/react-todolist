import React, { useState, useRef, useEffect } from "react"
import TodoList from "./TodoList"
import { v4 as uuidv4 } from 'uuid';



const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // LOAD todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // SAVE todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })

    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className="app-main">
      <h1>My Todo List</h1>

      <div className="app-wrapper">
        <div className="todo-table">
          <div className="todos">
            <TodoList todos={todos} toggleTodo={toggleTodo} />
          </div>
        </div>
      </div>

      <div className="todo-box">
        <div className="todo-form">
          <input ref={todoNameRef} type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo()
              }
          }}
          />
          <button onClick={handleAddTodo}>Add</button>
          <button onClick={handleClearTodos}>Clear</button>
        </div>


        <div className="remaining-todo">
          {todos.filter(todo => !todo.complete).length} left to do
        </div>
      </div>

    </div>
  )
}

export default App;
