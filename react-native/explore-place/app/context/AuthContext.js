import React, { useState, createContext,useEffect } from 'react'
import {userClient} from '../utils/userDB'
import {places} from '../utils/places'

export const AuthContext = createContext({
    auth: undefined,
    login: () => { },
    logout: () => { }
})

export function AuthProvider(props) {
    const { children } = props
    const [auth, setAuth] = useState("")
    const [listAuth, setListAuth] = useState([])

    const getList = () =>{
        return listAuth
    }

    const login = (userData) => {
        setAuth(userData)
    }

    const logout = () => {
        setAuth("")
    }

    const signUp = (newUser) => {
        let exist = listAuth.some(person => person.username === newUser.username)
        if(exist){
            return false
        }else{
            listAuth.push(newUser)
            setAuth(newUser)
            return true
        }
    }

    const firstClient = ()=>{
        userClient.reportes = places
        listAuth.push(userClient)
    }


    useEffect(() => {
        firstClient()
    }, [])

    const valueContext = {
        auth,
        login,
        logout,
        signUp,
        getList
    }

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    )
}