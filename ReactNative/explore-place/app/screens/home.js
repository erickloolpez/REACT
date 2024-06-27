import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/header'
import GoogleMapView from '../components/home/GoogleMapView'
import CategoryList from '../components/home/CategoryList'
import PlaceList from '../components/home/PlaceList'
import useLocation from '../hooks/useLocation'

export default function Home() {
    // const {depureList, placeCategory } = useLocation()
    const {placeSearch, depureListSearchBar } = useLocation()


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
        <ScrollView style={{ flex: 1, backgroundColor:'white' }} >
            <View style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Header />
                <GoogleMapView placeList={placeSearch} />
                <CategoryList depureList={depureListSearchBar} />
                {placeSearch ? <PlaceList placeList={placeSearch} /> : null}
            </View>
        </ScrollView>
    )
}