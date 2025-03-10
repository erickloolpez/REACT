import { useState, useEffect, createContext } from 'react'
import { places } from '../utils/places'

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
    const [placeSearch, setPlaceSearch] = useState([])

    const getPlaces = () => {
        setPlaceList(places)
    }

    const depureList = (type) => {
        setPlaceCategory(placeList.filter(place => place.tipo == type))
    }

    const depureListSearchBar = (text) => {
        let results = placeList.filter(place => place.nombre.toLowerCase().includes(text.toLowerCase()))
        if (results.length > 0) {
            setPlaceSearch(results)
        } else {
            results = placeList.filter(place => place.tipo.toLowerCase().includes(text.toLowerCase()))
            if (results.length > 0) {
                setPlaceSearch(results)
            }else{
                setPlaceSearch(placeList)
            }
        }
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
    useEffect(()=>{
        setPlaceSearch([...placeList])
    },[placeList])


    const valueContext = {
        location,
        setLocation,
        placeList,
        setPlaceList,
        addPlace,
        depureList,
        placeCategory,
        depureListSearchBar,
        placeSearch
    }

    return (
        <UserLocationContext.Provider value={valueContext}>
            {children}
        </UserLocationContext.Provider>
    )
}