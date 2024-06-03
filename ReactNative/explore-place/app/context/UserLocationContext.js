import { useState, useEffect, createContext } from 'react'
import {places} from '../utils/places'

export const UserLocationContext = createContext()

export function UserLocationProvider(props) {
    const { children } = props

    const [location, setLocation] = useState({
        latitude: "",
        longitude: ""
    }
    )

    const [placeList, setPlaceList] = useState([])
    const [placeCategory, setPlaceCategory] = useState([])

    const getPlaces = () => {
        setPlaceList(places)

    }

    const depureList = (type) => {
         setPlaceCategory(placeList.filter(place => place.tipo == type))
    }

    const addPlace = (newPlace) => {
        setPlaceList(currentPlaceList => [...currentPlaceList, newPlace])
    }

    useEffect(() => {
        getPlaces()
    }, [])
    useEffect(() => {
        setPlaceCategory([...placeList])
    }, [placeList])


    const valueContext = {
        location,
        setLocation,
        placeList,
        setPlaceList,
        addPlace,
        depureList,
        placeCategory
    }

    return (
        <UserLocationContext.Provider value={valueContext}>
            {children}
        </UserLocationContext.Provider>
    )
}