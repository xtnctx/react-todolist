import React, { useState } from "react"
import TodoItem from "./TodoItem"


const Todolist = () => {
    const [state, setState] = useState({
        todo: '',
        todolist: [],
    })

    const { todo, todolist } = state

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setState({...state, [name]: value})
    }


    const [edit, setEdit] = useState({
        editTodo: '',
        editIndex: '',
    })

    const [isUpdate, setIsUpdate] = useState(false)

    const { editTodo, editIndex } = edit

    const handleOnChangeEdit = (e) => {
        const { name, value } = e.target
        setEdit({...edit, [name]: value})
    }

    const handleOnClickEdit = (index, value) => {
        setIsUpdate(true)
        setEdit({editTodo: value, editIndex: index})
    }

    const handleOnClickCancel = () => {
        setIsUpdate(false)
    }
    // CREATE
    const createTodo = () => {
        const list = todolist
        list.push(todo)
        setState({todo: '', todolist: list})

    }

    // DELETE
    const deleteTodo = (index) => {
        const list = todolist
        list.splice(index, 1)
        setState({todo: '', todolist: list})
    }

    // UPDATE
    const updateTodo = (index) => {
        const list = todolist
        list[index] = editTodo
        setState({...state, todolist: list})
        setIsUpdate(false)
        setEdit({editTodo: '', editIndex: ''})
    }

    return (
        <div className="todo-window">
            <div className="todolist-box">
                <div className="form-wrapper">
                    <input 
                        name="todo" 
                        type="text" 
                        placeholder="Create todolist" 
                        value={todo} 
                        onChange={handleOnChange}
                    />
                    <button onClick={createTodo}>ADD</button>
                </div>
                <div className="table-main">
                    <div className="header-wrapper">
                        <span>To Do</span>
                        <span>Action</span>
                    </div>
                    {
                        todolist.length ?
                        todolist.map((value, index) => {
                            return (
                                <TodoItem 
                                key={index}
                                index={index}
                                value={value}
                                deleteTodo={deleteTodo}
                                handleOnClickEdit={handleOnClickEdit}
                                />
                            )
                        }) : <span style={{
                                fontStyle: 'italic',
                                display: 'grid',
                                gridTemplateColumns: '1fr 170px',
                                placeItems: 'center'
                                }}>
                                Woohoo, no more work to do!
                            </span>
                    }
                    {
                        isUpdate ?
                            <div className="form-wrapper2">
                                <span>Index: {editIndex}</span>
                                <input 
                                    name="editTodo" 
                                    type="text" 
                                    placeholder="Update todo" 
                                    value={editTodo} 
                                    onChange={handleOnChangeEdit}
                                />
                                <button onClick={() => updateTodo(editIndex)}>Update</button>
                                <button onClick={handleOnClickCancel}>Cancel</button>
                            </div> : ''
                    }
                    
                </div>
            </div>
            <div className="todo-urgent">
                <div className="table-main">
                    <div className="header-wrapper">
                        <span>Urgent!</span>

                    </div>
                    <div className="row-wrapper">
                        <span>Learn React</span>
                    </div>
                </div>
                
                    
            </div>
        </div>
        
    )
}

export default Todolist