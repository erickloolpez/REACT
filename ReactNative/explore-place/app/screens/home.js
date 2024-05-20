import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/header'
import GoogleMapView from '../components/home/GoogleMapView'
import CategoryList from '../components/home/CategoryList'
import GlobalApi from '../services/GlobalApi'
import PlaceList from '../components/home/PlaceList'

export default function Home() {
    const [placeList, setPlaceList] = useState([])


    const getPlaces = () => {
        setPlaceList([
            {
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
                latitude: -0.3077631314438677,
                longitude:-78.4500717340893,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'proceso',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo:'basurero'
            },
            {
                latitude: -0.3077631314438677,
                longitude:-78.4500717340893,
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'completado',
                descripcion: 'Los desechos no se están manejando correctamente y esto está teniendo un impacto negativo en nuestro entorno. He notado que los residuos sólidos y líquidos están filtrándose en el suelo, lo que temo pueda contaminar nuestras fuentes de agua. Esta contaminación podría causar problemas de salud tanto para nosotros como para la vida silvestre que habita en nuestra zona.',
                tipo:'basurero'

            },
        ])

    }

    useEffect(()=>{
        getPlaces()
    },[])

    //En caso de tener una API usar esto
    /*
    useEffect(()=>{
        GetNearBySearchPlace()
    },[])

    const GetNearBySearchPlace = ()=>{
        GlobalApi.nearByPlace().then(res=>{
            setPlaceList(res.data.results)
        })

    }*/
    return (
        <View style={{ padding: 20, flex:1 }}>
            <Header />
            <GoogleMapView />
            <CategoryList />
            {placeList ? <PlaceList placeList={placeList} /> : null}
        </View>
    )
}