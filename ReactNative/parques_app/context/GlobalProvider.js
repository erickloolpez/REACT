import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from '../lib/appwrite'

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const [userLocation, setUserLocation] = useState({})
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [isPlayable, setIsPlayable] = useState(true)
    const [score, setScore] = useState(120)

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLogged(true)
                    setUser(res)
                } else {
                    setIsLogged(false)
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])

    return (
        <GlobalContext.Provider value={{
            userLocation,
            setUserLocation,
            isLogged,
            setIsLogged,
            user,
            setUser,
            loading,
            isPlayable,
            setIsPlayable,
            score,
            setScore
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider