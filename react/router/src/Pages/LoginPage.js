import React,{useState} from 'react'
import {useAuth} from '../Utils/auth'
import { Navigate } from 'react-router-dom'

function LoginPage() {
    const [username,setUserName] = useState('')
    const  auth = useAuth()

    const login = (e)=>{
        e.preventDefault()
        auth.login({username})
    }

    if(auth.user){
        return <Navigate to='/profile'/>
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={login}>
                <label>Nombre de Usuario:</label>
                <input value={username} onChange={(event)=> setUserName(event.target.value)} />
                <button type='submit'>Entrar</button>
            </form>
        </>
    )
}

export { LoginPage }