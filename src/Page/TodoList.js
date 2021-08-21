import React, { useEffect, useState } from 'react'
import Actions from '../Components/TodoList/Actions'
import Create from '../Components/TodoList/Create'
import List from '../Components/TodoList/List'
import '../css/TodoList.css'

export default function TodoList() {
    const [todo, setTodo] = useState([
        {
            id: 1,
            name: 'acb',
            status: false
        },
        {
            id: 2,
            name: 'nam',
            status: false
        },
        {
            id: 3,
            name: 'huynh',
            status: false
        }
    ])
    const [arrFilter, setArrFilter] = useState([])
    const [type, setType] = useState('All')
    const [editText, setEditTest] = useState('')

    useEffect(() => {
        if (localStorage && localStorage.getItem('todo')) {
            var todoLocal = JSON.parse(localStorage.getItem('todo'))
            setTodo(todoLocal)
        } else {
            localStorage.setItem('todo', JSON.stringify(todo))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todo));
    }, [todo])

    const handleCreate = (addName) => {
        setTodo([...todo, addName])
    }

    const handleCheck = (item) => {
        let arrActive = [...todo]
        let location = todo.indexOf(item)
        arrActive[location].status = !arrActive[location].status
        setTodo(arrActive)
    }

    const handleCheckAll = () => {
        let arrActive = [...todo]
        let arrStatus = []
        arrActive.map(item => {
            arrStatus.push(item.status)
        })
        if (arrStatus.indexOf(false) !== -1) {
            arrStatus.fill(true)
        }
        else if (arrStatus.indexOf(false) == -1) {
            arrStatus.fill(false)
        }
        for (let i = 0; i < arrActive.length; i++) {
            for (let j = 0; j < arrStatus.length; j++) {
                arrActive[i].status = arrStatus[j]
            }
        }
        setTodo(arrActive)
    }

    const handleFilter = (type) => {
        setType(type)
    }
    // khi type hoặc todo có thay đổi thì Filter
    useEffect(() => {
        let arrFilter = []
        if (type === '' || type === 'All') {
            arrFilter = todo
        }
        else if (type === 'Active') {
            let arrActive = todo.filter(item => item.status !== true)
            arrFilter = arrActive
        }
        else if (type === 'Completed') {
            let arrCompleted = todo.filter(item => item.status === true)
            arrFilter = arrCompleted
        }
        setArrFilter(arrFilter)
    }, [type, todo])

    const handleDelete = (item) => {
        let newArr = [...todo]
        let location = todo.indexOf(item)
        newArr.splice(location, 1)
        setTodo(newArr)
    }

    const handleDeleteMany = () => {
        let newArr = todo.filter(item => item.status !== true)
        setTodo(newArr)
    }

    const handleGetValueEdit = (value) => {
        setEditTest(value)
    }
    const handleEdit = (item) => {
        if (editText != '') {
            let newArr = [...todo]
            let location = todo.indexOf(item)
            newArr[location].name = editText
            setTodo(newArr)
        }
    }

    let lengthTodo = todo.length
    return (
        <div>
            <h1 className="label-todo">todos</h1>
            <div className='group-todo'>
                <div className="header">
                    <Create todo={todo} handleCreate={handleCreate} handleCheckAll={handleCheckAll} />
                </div>
                {lengthTodo > 0
                    ?
                    <>
                        <div className="main">
                            <List todo={todo} handleCheck={handleCheck}
                                arrFilter={arrFilter} type={type} handleDelete={handleDelete}
                                handleGetValueEdit={handleGetValueEdit} handleEdit={handleEdit}
                                editText={editText} setEditTest={setEditTest} />
                        </div>
                        <div className="footer">
                            <Actions todo={todo} handleFilter={handleFilter} type={type} handleDeleteMany={handleDeleteMany} />
                        </div>
                    </>
                    :
                    ''
                }
            </div>
        </div>
    )
}
