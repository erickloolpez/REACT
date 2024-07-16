import React from 'react'
import {useAuth} from '../Utils/auth'

function LogOutPage() {
    const auth = useAuth()

    const logout = (e)=>{
        e.preventDefault()
        auth.logout()
    }
    return (
        <>
            <h1>Logout</h1>
            <form onSubmit={logout}>
                <label>Segur@ que quieres salir?</label>
                <button type='submit'>Salir</button>
            </form>
        </>
    )
}

export { LogOutPage }