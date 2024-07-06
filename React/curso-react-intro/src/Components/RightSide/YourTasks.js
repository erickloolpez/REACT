import React from 'react'
import { IoSearch } from "react-icons/io5";
import './style.css'
import {Task} from './Task';

function YourTasks() {
  const listTodos = [{text:'Meditar como uwei..',completed:false}, {text:'Pasear al wapo...',completed:true}]
  return (
    <div style={{ width: '75%', height: '90%',  display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 20 }}>
      <div style={{ width: '80%', height: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
        <h1 className='task-title' style={{ fontSize: 70, margin: 0, }}>Your tasks</h1>
        <h2 style={{margin:0}}>Completed 3 to 5</h2>
        <div style={{ width: 260, height: 40, display: 'flex', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', overflow: 'hidden',marginTop:20 }}>
          <input style={{ width: '80%', height: '100%', margin: 0, paddingInline: 10, border: 'none',outline:'none' }} placeholder={'Search...'} />
          <IoSearch size={28} style={{ backgroundColor: 'yellow',marginRight:6 }} />
        </div>
      </div>
      <div style={{ width: '80%', height: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        {listTodos.map((todo,index)=>(
          <Task key={index} todo={todo} />
        ))}

      </div>
      <div style={{ width: '90%', height: '10%', }}>
      </div>

    </div>
  )
}

export { YourTasks }