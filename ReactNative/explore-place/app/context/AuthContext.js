import React,{useState, createContext} from 'react'

export const AuthContext = createContext({
    auth: undefined,
    login: ()=>{},
    logout: ()=>{}
})

export function AuthProvider(props){
    const {children} = props
    const [auth, setAuth] = useState(undefined)
    const [listAuth, setListAuth] = useState([])

    const login = (userData)=>{
        setAuth(userData)
    }

    const logout = ()=>{
        setAuth(undefined)
    }

    const signUp = (listUsers) =>{
        setListAuth([...listAuth, listUsers])
    }

    const valueContext ={
        auth,
        login,
        logout,
        signUp,
        listAuth
    }

    return(
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    )
}