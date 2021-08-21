import React from 'react'
import '../../css/Actions.css'

export default function Actions(props) {
    const { handleFilter, todo, type, handleDeleteMany } = props;
    let arrActive = todo.filter(item => item.status !== true)
    let arrCompleted = todo.filter(item => item.status === true)
    return (

        <div className='group-actions'>
            <p>{`${arrActive.length} items left`}</p>
            <ul className='filter'>
                <li className={type === 'All' ? 'active-filter' : ''} onClick={() => handleFilter('All')}>All</li>
                <li className={type === 'Active' ? 'active-filter' : ''} onClick={() => handleFilter('Active')}>Active</li>
                <li className={type === 'Completed' ? 'active-filter' : ''} onClick={() => handleFilter('Completed')}>Completed</li>
            </ul>
            <p className='clear-all' onClick={() => handleDeleteMany()} style={arrCompleted.length > 0 ? { visibility: 'visible' } : { visibility: 'hidden' }}>Clear Completed</p>
        </div>
    )
}

