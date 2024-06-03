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
    const [placeCategory, setPlaceCategory] = useState([])

    const getPlaces = () => {
        setPlaceList([
            {
                id: '1',
                latitude: -0.3077631314438677,
                longitude: -78.4500717340893,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: 'https://www.planv.com.ec/sites/default/files/basura-plasticos.jpg',
                estado: 'pendiente',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo: 'Basureros'
            },
            {
                id: '2',
                latitude: -0.3194556303568174,
                longitude: -78.44209061533331,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: 'https://imagenes.extra.ec/uploads/2021/04/11/6073b3504b38b.jpeg',
                estado: 'proceso',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo: 'Basureros'
            },
            {
                id: '3',
                latitude: -0.29473674764517127,
                longitude: -78.46159563877885,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: 'https://quenoticias.com/wp-content/uploads/2022/06/041CC650-8F6E-4A0D-8B37-F3459FE81C94.jpeg',
                estado: 'completado',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo: 'Escombros'

            },
            {
                id: '3',
                latitude: -0.29473674764517127,
                longitude: -78.46159563877885,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: 'https://es.conceptualhouseplans.com/wp-content/uploads/2018/11/29/dozhdepriemniki-dlja-livnevoj-kanalizacii_2.jpg',
                estado: 'pendiente',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo: 'Alcantarillado'

            },
            {
                id: '3',
                latitude: -0.29473674764517127,
                longitude: -78.46159563877885,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: 'https://www.elcomercio.com/wp-content/uploads/2022/05/perro-2.jpg',
                estado: 'proceso',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo: 'Animalito'

            },
            {
                id: '3',
                latitude: -0.29473674764517127,
                longitude: -78.46159563877885,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: 'https://i.pinimg.com/originals/64/f9/a8/64f9a85ec8b0b55fa2dcdd1974ab6a87.jpg',
                estado: 'completado',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo: 'Calles'

            },
            {
                id: '3',
                latitude: -0.29473674764517127,
                longitude: -78.46159563877885,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: 'https://tecolotito.elsiglodetorreon.com.mx/i/2018/03/1041909.jpeg',
                estado: 'pendiente',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo: 'Parques'

            },
        ])

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