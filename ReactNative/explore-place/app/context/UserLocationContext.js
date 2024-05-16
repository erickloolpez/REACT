import { useState, useEffect, createContext } from 'react'

export const UserLocationContext = createContext()

export function UserLocationProvider(props) {
    const { children } = props
    const [location, setLocation] = useState({
        latitude: "",
        longitude: ""
    }
    )

    const valueContext = {
        location,
        setLocation,
    }

    return (
        <UserLocationContext.Provider value={valueContext}>
            {children}
        </UserLocationContext.Provider>
    )
}