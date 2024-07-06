import React from 'react'
import { FaCheck } from "react-icons/fa6";

function Task({todo}) {
    return (
        <div className={`${todo.completed? 'task-complete':'task'}`} style={{ width: '80%', height: 60, display: 'flex', alignItems: 'center', paddingInline: 12, borderRadius: 10, marginTop: 10 }}>
            <div className='circle' style={{ width: 30, height: 30, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {!todo.completed && <div style={{ width: 20, height: 20, backgroundColor: 'white', borderRadius: 50, overflow: 'hidden' }}></div>}
                {todo.completed && <FaCheck size={18} style={{ backgroundColor: '#9BCED3', color: 'white', borderRadius: 50, padding: 2 }} />}
            </div>
            <p className={`${todo.completed && 'task-complete--p'}`} style={{ fontSize: 18, marginTop: 13, marginLeft: 8, color: '#979690' }}>Caminar con el wapo</p>
        </div>
    )
}

export {Task}