import {View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/header'
import GoogleMapView from '../components/home/GoogleMapView'
import CategoryList from '../components/home/CategoryList'
import GlobalApi from '../services/GlobalApi'
import PlaceList from '../components/home/PlaceList'

export default function Home(){
    const [placeList, setPlaceList] = useState([])


    useEffect(()=>{
        GetNearBySearchPlace()
    },[])

    const GetNearBySearchPlace = ()=>{
        GlobalApi.nearByPlace().then(res=>{
            setPlaceList(res.data.results)
        })

    }
    return(
        <View style={{padding:20}}>
            <Header/>
            <GoogleMapView/>
            <CategoryList />
            {placeList ? <PlaceList placeList={placeList} /> : null}
        </View>
    )
}