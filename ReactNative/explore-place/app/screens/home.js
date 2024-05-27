import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/header'
import GoogleMapView from '../components/home/GoogleMapView'
import CategoryList from '../components/home/CategoryList'
import PlaceList from '../components/home/PlaceList'
import useLocation from '../hooks/useLocation'

export default function Home() {
    const {placeList} = useLocation()
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
            <GoogleMapView placeList={placeList} />
            <CategoryList />
            {placeList ? <PlaceList placeList={placeList} /> : null}
        </View>
    )
}