import React, { useContext, useState } from 'react'
import { useNavigate,Navigate } from 'react-router-dom'

const adminList = ['perrito','gato','kitty']

const AuthContext = React.createContext()

function AuthProvider({ children }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    const login = ({username})=>{
        const isAdmin = adminList.find(admin => admin === username)
        setUser({username, isAdmin})
        navigate('/profile')
    }

    const logout = ()=>{
        setUser(null)
        navigate('/')
    }

    const auth ={user, login, logout} 
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth (){
    const auth = useContext(AuthContext)
    return auth
}

function AuthRoute(props){
  const auth = useAuth()

  if(!auth.user){
    return <Navigate to='/login'/>
  }

  return props.children

}

export {AuthProvider, useAuth, AuthRoute}