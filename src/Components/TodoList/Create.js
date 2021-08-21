import React, { useState } from 'react'
import '../../css/Create.css'
import { FaChevronDown } from 'react-icons/fa'

export default function Create(props) {
    const { todo, handleCreate, handleCheckAll } = props;
    const [addName, setAddName] = useState({
        id: 0,
        name: ''
    })

    const getValue = (e) => {
        let arrId = []
        todo.map(item => {
            arrId.push(item.id)
        })
        let maxID = null
        if (Math.max(...arrId) >= 0) {
            maxID = Math.max(...arrId) + 1
        } else maxID = 1
        setAddName({ ...addName, id: maxID, name: e.target.value, status: false })
    }
    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            handleCreate(addName)
            setAddName({ name: '' })
        }
    }

    let arrStatus = []
    let disableIcon = false
    todo.map(item => {
        arrStatus.push(item.status)
    })
    if (arrStatus.indexOf(false) !== -1) {
        disableIcon = true
    }
    if (todo.length === 0) {
        disableIcon = true
    }
    return (
        <div className='group-create'>
            <div className={disableIcon ? 'icon-chevron' : 'icon-chevron-all'} onClick={() => handleCheckAll()}><FaChevronDown /></div>
            <input
                className='input-create'
                placeholder="What needs to be done?"
                value={addName.name}
                onChange={(e) => getValue(e)}
                onKeyDown={(e) => handleSubmit(e)}
            />
        </div>
    )
}
