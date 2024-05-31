import { useState, useEffect, createContext } from 'react'

export const UserLocationContext = createContext()

export function UserLocationProvider(props) {
    const { children } = props

    const [location, setLocation] = useState({
        latitude: "",
        longitude: ""
    }
    )

    const [placeList, setPlaceList] = useState([])

    const getPlaces = () => {
        setPlaceList([
            {
                id: '1',
                latitude: -0.3077631314438677,
                longitude:-78.4500717340893,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'pendiente',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo:'basurero'
            },
            {
                id: '2',
                latitude:-0.3194556303568174,
                longitude: -78.44209061533331,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'proceso',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo:'basurero'
            },
            {
                id: '3',
                latitude:-0.29473674764517127, 
                longitude:-78.46159563877885,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'completado',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo:'basurero'

            },
            {
                id: '3',
                latitude:-0.29473674764517127, 
                longitude:-78.46159563877885,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'pendiente',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo:'basurero'

            },
            {
                id: '3',
                latitude:-0.29473674764517127, 
                longitude:-78.46159563877885,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'proceso',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo:'basurero'

            },
            {
                id: '3',
                latitude:-0.29473674764517127, 
                longitude:-78.46159563877885,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'completado',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo:'basurero'

            },
            {
                id: '3',
                latitude:-0.29473674764517127, 
                longitude:-78.46159563877885,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'pendiente',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo:'basurero'

            },
        ])

    }

    const addPlace = (newPlace)=>{
        setPlaceList(currentPlaceList => [...currentPlaceList, newPlace])
    }

    useEffect(()=>{
        getPlaces()
    },[])

    const valueContext = {
        location,
        setLocation,
        placeList,
        setPlaceList,
        addPlace
    }

    return (
        <UserLocationContext.Provider value={valueContext}>
            {children}
        </UserLocationContext.Provider>
    )
}