import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, getTopFiveParks } from '../lib/appwrite'
import useAppwrite from '../lib/useAppwrite'
import { parks } from '../constants'

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const [userLocation, setUserLocation] = useState({})

    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [isPlayable, setIsPlayable] = useState(true)
    const [score, setScore] = useState(120)
    const [topFiveParks, setTopFiveParks] = useState([])

    useEffect(() => {
        getTopFiveParks()
            .then((res) => {
                setTopFiveParks(res
                    .slice(0, 5) // Solo los primeros cinco favoritos
                    .map((park) => parks.find((p) => p.name === park.nombre))
                    .filter(Boolean))
            })
    }, [])

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
            setScore,
            topFiveParks
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider