import {createContext, useContext, useState, useEffect} from 'react'

const GlobalContext = createContext()

export const useGlobalContext = ()=> useContext(GlobalContext)

const GlobalProvider = ({children})=>{
    const [userLocation, setUserLocation] =useState({}) 

    return(
        <GlobalContext.Provider value={{userLocation, setUserLocation}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider