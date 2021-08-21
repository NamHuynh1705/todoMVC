import React, { useEffect, useState } from 'react'
import '../../css/List.css'
import { FaTimes } from 'react-icons/fa'

export default function List(props) {
    const { todo, handleCheck, arrFilter, type, handleDelete, handleGetValueEdit, handleEdit, editText, setEditTest } = props;
    const [todoMap, settodoMap] = useState([])
    const [edit, editing] = useState()

    useEffect(() => {
        if (type === '' || type === 'All') {
            settodoMap(todo)
        } else settodoMap(arrFilter)
    })

    const onCheck = (item) => {
        handleCheck(item)
    }

    const onDoubleClick = (item) => {
        editing(item.id)
        setEditTest(item.name)
    }

    const getValue = (e) => {
        handleGetValueEdit(e.target.value)
    }

    const handleSubmit = (e, item) => {
        if (e.key === 'Enter') {
            handleEdit(item)
            editing(null)
        }
    }

    const changeInputEdit = (item) => {
        if (edit === item.id) {
            return (
                <input className='edit' value={editText} onChange={(e) => getValue(e)} onKeyDown={(e) => handleSubmit(e, item)} autoFocus />
            )
        } else return (<div className={!item.status ? 'name' : 'name-active'}>{item.name}</div>)
    }

    const onBlurHandler = (item) => {
        handleEdit(item)
        editing(null)
    }


    return (
        <div className='todo-list'>
            <ul className='ul-todo'>
                {todoMap && todoMap.map((item, index) => {
                    return (
                        <li className={edit === item.id ? 'editing li-todo' : 'li-todo'} key={index}
                            onDoubleClick={() => onDoubleClick(item)}
                            onBlur={() => onBlurHandler(item)}
                        >
                            <div className='round'>
                                <input type="checkbox" checked={item.status} id={`checkbox_${item.id}`} onChange={() => onCheck(item)} />
                                <label htmlFor={`checkbox_${item.id}`}></label>
                                {changeInputEdit(item)}
                                <FaTimes className='button-delete' onClick={() => handleDelete(item)} />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
