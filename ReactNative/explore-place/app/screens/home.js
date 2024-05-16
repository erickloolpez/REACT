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
                latitude: 'loool',
                longitude: 'lol',
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'pendiente'
            },
            {
                latitude: 'loool',
                longitude: 'lol',
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'pendiente'
            },
            {
                latitude: 'loool',
                longitude: 'lol',
                nombre: 'Basurero Eloy Alfaro',
                peticiones: 4,
                imagen: '../../assets/images/placeholder.jpg',
                estado: 'pendiente'
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